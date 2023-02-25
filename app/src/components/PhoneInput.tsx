import { IonSelect, IonSelectOption } from "@ionic/react";
import india from "../assets/india.png";
// export default function PhoneInput() {
//   return (
//     <div>
//       <label
//         htmlFor="phone-number"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Phone Number
//       </label>
//       <div className="relative mt-1 rounded-md shadow-sm">
//         <div className="absolute inset-y-0 left-0 flex items-center">
//           <label htmlFor="country" className="sr-only">
//             Country
//           </label>
//           {/* <select
//             id="country"
//             name="country"
//             autoComplete="country"
//             className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           >
//             <option>IN</option>
//           </select> */}
//           <IonSelect placeholder="Select fruit">
//             <IonSelectOption value="apples">Apples</IonSelectOption>
//             <IonSelectOption value="oranges">Oranges</IonSelectOption>
//             <IonSelectOption value="bananas">Bananas</IonSelectOption>
//           </IonSelect>
//         </div>
//         <input
//           type="text"
//           name="phone-number"
//           id="phone-number"
//           className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           placeholder="+91 9876543210"
//         />
//       </div>
//     </div>
//   );
// }

export default function PhoneInput() {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-base font-medium text-gray-700"
      >
        Phone
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 ">
            <img src={india} className="w-6" alt="" />
          </span>
        </div>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          className="block w-full rounded-md border-gray-300 pl-12 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="9876543210"
        />
      </div>
    </div>
  );
}
