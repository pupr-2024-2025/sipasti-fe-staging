// import React from "react";
// import { GoogleMap, Marker } from "@react-google-maps/api";
// import TextInput from "./input";

// const MapSection = ({
//   containerStyle,
//   center,
//   onLoad,
//   onUnmount,
//   handleMapClick,
//   markerPosition,
//   searchValue,
//   handleSearchChange,
//   suggestions,
//   handleSuggestionClick,
//   koordinat,
//   handleKoordinatChange,
// }) => {
//   return (
//     <div className="space-y-6">
//       <div
//         style={{
//           marginBottom: "10px",
//           position: "relative",
//           borderRadius: "16px",
//         }}>
//         <input
//           type="text"
//           placeholder="Cari lokasi..."
//           value={searchValue}
//           onChange={handleSearchChange}
//           style={{
//             padding: "8px",
//             borderRadius: "12px",
//             border: "1px solid #ccc",
//             width: "100%",
//           }}
//         />
//         {suggestions.length > 0 && (
//           <ul
//             style={{
//               listStyle: "none",
//               margin: 0,
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: "#fff",
//               position: "absolute",
//               width: "100%",
//               zIndex: 10,
//               top: "40px",
//             }}>
//             {suggestions.map((suggestion) => (
//               <li
//                 key={suggestion.place_id}
//                 onClick={() => handleSuggestionClick(suggestion.place_id)}
//                 style={{
//                   padding: "8px",
//                   cursor: "pointer",
//                   borderBottom: "1px solid #eee",
//                 }}>
//                 {suggestion.description}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <GoogleMap
//         Marker
//         position={center}
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         onClick={handleMapClick}>
//         <Marker position={markerPosition} />
//       </GoogleMap>
//       <TextInput
//         label="Koordinat"
//         placeholder="Masukkan Koordinat"
//         type="text"
//         value={koordinat}
//         onChange={handleKoordinatChange}
//         state="border"
//       />
//     </div>
//   );
// };

// export default MapSection;
