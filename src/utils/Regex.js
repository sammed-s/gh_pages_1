// export const getColorFromStyle = (styles, sourceLocation, source) => {
//   const locationPattern = /^stl_COL(\w+)$/;
//   const match = locationPattern.exec(sourceLocation);
//   if (match) {
//     const location = match[1];
//     let baseKey;

//     switch (true) {
//       case source.quotes && source.normalSource:
//         baseKey = `stl_COL${location}QX`;
//         break;
//       case source.quotes:
//         baseKey = `stl_COL${location}Q`;
//         break;
//       case source.reference:
//         baseKey = `stl_COL${location}R`;
//         break;
//       case source.smallSources:
//         baseKey = `stl_COL${location}X`;
//         break;
//       default:
//         baseKey = `stl_COL${location}`;
//         break;
//     }

//     console.log("sourceLocation", sourceLocation);
//     return styles[baseKey];
//   }

//   return "inherit";
// };
