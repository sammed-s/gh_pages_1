export const scrollToElement = (data, direction, anchorEl) => {
  const elementBaseClasses = [
    `s_r_c_${data?.location}_`,
    `Qs_r_c_${data?.location}_`,
    `Rs_r_c_${data?.location}_`,
  ];

  const foundElements = [];

  let suffix = 1;
  while (true) {
    let foundInThisIteration = false;
    for (const baseClass of elementBaseClasses) {
      const className = `${baseClass}${suffix}`;
      const elements = document.getElementsByClassName(className);

      if (elements.length > 0) {
        foundElements.push(elements[0]);
        foundInThisIteration = true;
      }
    }

    if (!foundInThisIteration) {
      break;
    }

    suffix++;
  }

  if (foundElements.length > 0) {
    let targetElement;

    if (direction === "prev" || direction === "next") {
      let currentIndex = foundElements.findIndex((el) => el === anchorEl);

      if (direction === "prev" && currentIndex > 0) {
        currentIndex -= 1;
      } else if (
        direction === "next" &&
        currentIndex < foundElements.length - 1
      ) {
        currentIndex += 1;
      }

      targetElement = foundElements[currentIndex];
    } else {
      targetElement = foundElements[0];
    }

    if (targetElement) {
      const onScrollEnd = () => {
        window.removeEventListener("scroll", scrollHandler);
        targetElement.classList.add("underLine");
        setTimeout(() => {
          targetElement.classList.remove("underLine");
        }, 2000);

        const event = new CustomEvent("elementScrolled", {
          detail: { targetElement, data },
        });
        document.dispatchEvent(event);
      };

      let isScrolling;
      const scrollHandler = () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(onScrollEnd, 200);
      };

      window.addEventListener("scroll", scrollHandler);
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      scrollHandler();
      return { targetElement, data };
    } else {
      console.log("Element not found");
    }
  } else {
    console.log("No elements found for the given location");
  }
  return null;
};

export const extractLocation = (element) => {
  const classList = Array.from(element.classList);
  let lastLocation = null;

  for (const baseClass of ["s_r_c_", "Qs_r_c_", "Rs_r_c_", "stl_COL"]) {
    const matchedClasses = classList.filter((cls) => cls.startsWith(baseClass));
    if (matchedClasses.length > 0) {
      const lastMatchedClass = matchedClasses[matchedClasses.length - 1];
      const location = lastMatchedClass.replace(baseClass, "").split("_")[0];
      lastLocation = location.replace(/\D/g, "");
    }
  }

  return lastLocation;
};

export const checkboxChange = (
  sourceId,
  sourceData,
  isSelectAll = false,
  includedSource,
  selectedCheckboxes,
) => {
  const enabledSourceIds = sourceData.sourceListParent.flatMap((row) =>
    row.sourceList
      .filter((source) => {
        const isDisabled =
          (includedSource &&
            source.type === "primarySource" &&
            source.sourceIdentity === "0") ||
          (source.sourceIdentity === "2" &&
            row.sourceList.length > 1 &&
            row.sourceList.some(
              (s) => s.sourceIdentity === "2" || s.type === "alternateSource",
            ));
        return !isDisabled;
      })
      .map((source) => source.location),
  );

  let updatedSelectedCheckboxes = [];
  let selectedAll = false;

  if (isSelectAll) {
    if (includedSource === false) {
      if (
        selectedCheckboxes.length ===
        sourceData.sourceListParent.flatMap((row) =>
          row.sourceList.filter((source) => source.sourceIdentity === "0"),
        ).length
      ) {
        updatedSelectedCheckboxes = [];
        selectedAll = false;
      } else {
        updatedSelectedCheckboxes = sourceData.sourceListParent.flatMap((row) =>
          row.sourceList
            .filter((source) => source.sourceIdentity === "0")
            .map((source) => source.location),
        );
        selectedAll = true;
      }
    } else {
      if (selectedCheckboxes.length === enabledSourceIds.length) {
        updatedSelectedCheckboxes = [];
        selectedAll = false;
      } else {
        updatedSelectedCheckboxes = enabledSourceIds;
        selectedAll = true;
      }
    }
  } else {
    updatedSelectedCheckboxes = selectedCheckboxes.includes(sourceId)
      ? selectedCheckboxes.filter((id) => id !== sourceId)
      : [...selectedCheckboxes, sourceId];
    selectedAll = enabledSourceIds.length === updatedSelectedCheckboxes.length;
  }

  return { updatedSelectedCheckboxes, selectedAll };
};

export const scrollToElementsWithPage = (activeTab) => {
  const activePage = document.querySelector(`.page-${activeTab}`);
  const targetElement = document.querySelector(`.ak_shy_${activeTab}`);

  if (activePage) {
    activePage.scrollIntoView({ behavior: "smooth", block: "center" });
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
};

export const handleExcludeIncludeHtml = (includedSource, locations) => {
  const numbers = locations.map((str) => parseInt(str, 10));
  const classPatterns = [
    {
      target: (loc) => `stl_COL${loc}`,
      addX: (loc) => `stl_COL${loc}X`,
      removeX: (loc) => `stl_COL${loc}`,
    },
    {
      target: (loc) => `stl_COL${loc}R`,
      addX: (loc) => `stl_COL${loc}RX`,
      removeX: (loc) => `stl_COL${loc}R`,
    },
    {
      target: (loc) => `stl_COL${loc}Q`,
      addX: (loc) => `stl_COL${loc}QX`,
      removeX: (loc) => `stl_COL${loc}Q`,
    },
  ];

  const styleTags = document.querySelectorAll("style");
  numbers.forEach((num) => {
    classPatterns.forEach(({ target, addX, removeX }) => {
      const targetClass = target(num);
      const replacementClass = includedSource ? addX(num) : removeX(num);
      styleTags.forEach((styleTag) => {
        const cssRules = styleTag.sheet?.cssRules || [];
        for (let i = 0; i < cssRules.length; i++) {
          const rule = cssRules[i];
          const classRegex = includedSource
            ? new RegExp(`\\b${targetClass}\\b`, "g")
            : new RegExp(`\\b${targetClass}X\\b`, "g");

          if (rule.selectorText?.match(classRegex)) {
            const updatedRule = rule.cssText.replace(
              classRegex,
              replacementClass,
            );
            styleTag.sheet.deleteRule(i);
            styleTag.sheet.insertRule(updatedRule, i);
          }
        }
      });
    });
  });
};

export const handleExcludeIncludeSettings = (inputArray) => {
  const quotes = new Set();
  const reference = new Set();
  const smallSources = new Set();

  function findObjects(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(findObjects);
    } else if (typeof obj === "object" && obj !== null) {
      const keys = [
        "location",
        "quotes",
        "reference",
        "smallSources",
        "normalSource",
      ];
      const hasAllKeys = keys.every((key) => obj.hasOwnProperty(key));

      if (hasAllKeys) {
        if (obj.quotes === true) quotes.add(obj.location.toString());
        if (obj.reference === true) reference.add(obj.location.toString());
        if (obj.smallSources === true)
          smallSources.add(obj.location.toString());
      } else {
        Object.values(obj).forEach(findObjects);
      }
    }
  }

  findObjects(inputArray);

  return {
    quotes: Array.from(quotes),
    reference: Array.from(reference),
    smallSources: Array.from(smallSources),
  };
};

export const scrollToRow = (location) => {
  const rowElement = document.querySelector(`.col${location}`);
  if (rowElement) {
    rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
    const parentRow = rowElement.closest("tr");
    if (parentRow) {
      parentRow.classList.add("highlighted");
      setTimeout(() => {
        parentRow.classList.remove("highlighted");
      }, 2000);
    }
  }
};
