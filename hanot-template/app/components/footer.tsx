import { StoreEntity } from "feeef";

import { PhoneIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function Footer({ store }: { store: StoreEntity }) {
  return (
    <footer dir="rtl" className="bg-gray-100 py-8   md:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-right">
        {/* Column 1: Store Info */}
        <div>
          <h2 className="text-xl text-center font-bold mb-2">{store.name}</h2>
          <p className="text-gray-500 text-center">جميع الحقوق محفوظة © 2024</p>
          <Image
            className="h-8 w-auto mt-4 mx-auto"
            src={store.logoUrl!}
            alt={store.name}
            width={100}
            height={100}
          />
        </div>

        {/* Column 2: Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">تواصل معنا</h3>
          <ul className="text-gray-600">
            <li className="mb-1">
              <a href="#">أسئلة شائعة</a>
            </li>
            <li className="mb-1">
              <a href="#">اتصل بنا</a>
            </li>
            <li>هاتف: </li>
          </ul>
        </div>

        {/* Column 3: Store Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-2">عن المتجر</h3>
          <ul className="text-gray-600">
            <li className="mb-1">
              <a href="#">من نحن</a>
            </li>
            <li className="mb-1">
              <a href="#">طرق الدفع</a>
            </li>
            <li className="mb-1">
              <a href="#">الشحن والتسليم</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Terms and Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-2">الشروط والسياسات</h3>
          <ul className="text-gray-600">
            <li className="mb-1">
              <a href="#">شروط الاستخدام</a>
            </li>
            <li className="mb-1">
              <a href="#">سياسة الخصوصية</a>
            </li>
            <li className="mb-1">
              <a href="#">سياسة الإستبدال والإسترجاع</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="container mx-auto text-center mt-6">
        <p className="text-gray-500 mb-4">تابعنا على</p>
        <div className="flex justify-center space-x-4 text-gray-600">
          <a href="#">
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="#">
            <i className="fab fa-tiktok text-xl"></i>
          </a>
        </div>
      </div>

      {/* Call button */}
      <div className="fixed bottom-6 left-10">
        <a
          href="tel:064343422560"
          className="bg-blue-500 text-white p-4 py-6 w-8 h-8 rounded-full shadow-lg hover:bg-blue-600"
        >
          <PhoneIcon className="  inline-block animate-pulse" />
        </a>
      </div>
    </footer>
  );
}
