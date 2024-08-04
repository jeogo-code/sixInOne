"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Component() {
  const [formProgress, setFormProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop - 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const inputs = document.querySelectorAll("form input");
    const filledInputs = Array.from(inputs).filter(
      (input) => input.value !== ""
    );
    setFormProgress((filledInputs.length / inputs.length) * 100);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 rtl">
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A5568"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="M3 3h18v18H3zM12 8v8m-4-4h8" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">OmniMart</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            {[
              { id: "bracelets", name: "أساور" },
              { id: "belts", name: "أحزمة" },
              { id: "sunglasses", name: "نظارات شمسية" },
              { id: "earphones", name: "سماعات" },
              { id: "rings", name: "خواتم" },
              { id: "watches", name: "ساعات" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-lg font-medium transition-colors hover:text-indigo-600 ${
                  activeSection === section.id
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600"
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-down">
              اكتشف روعة الإكسسوارات الفاخرة
            </h2>
            <p className="text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-up">
              تألق بأناقة حقيقية مع مجموعتنا الحصرية من 6 إكسسوارات راقية بسعر
              خاص 41000 دج فقط!
            </p>
            <Button
              onClick={() => scrollToSection("order")}
              className="bg-white text-indigo-600 hover:bg-indigo-100 text-xl py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              اطلب الآن واحصل على خصم 15٪
            </Button>
          </div>
        </section>
        {[
          {
            id: "bracelets",
            name: "أساور",
            desc: "أساور فاخرة بتصاميم أصيلة تعكس الثقافة الغنية",
          },
          {
            id: "belts",
            name: "أحزمة",
            desc: "أحزمة أنيقة مصنوعة يدويًا من أجود أنواع الجلود لمظهر متميز",
          },
          {
            id: "sunglasses",
            name: "نظارات شمسية",
            desc: "نظارات شمسية عصرية تحمي عينيك بأناقة وتضيف لمسة من الرقي",
          },
          {
            id: "earphones",
            name: "سماعات",
            desc: "سماعات لاسلكية بجودة صوت عالية وتصميم مريح لتجربة استماع فريدة",
          },
          {
            id: "rings",
            name: "خواتم",
            desc: "خواتم مميزة مستوحاة من التراث الغني لإطلالة ساحرة",
          },
          {
            id: "watches",
            name: "ساعات",
            desc: "ساعات أنيقة تجمع بين الدقة والجمال لتكمل مظهرك الراقي",
          },
        ].map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`w-full py-20 md:py-32 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 md:px-6">
              <div
                className={`space-y-6 text-right ${
                  index % 2 === 0 ? "order-2" : "order-1"
                }`}
              >
                <h2 className="text-4xl font-bold text-gray-800">
                  {section.name}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {section.desc}
                </p>
              </div>
              <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                <img
                  src={`https://source.unsplash.com/random/800x800?${section.id}`}
                  alt={section.name}
                  className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 w-full h-auto"
                />
              </div>
            </div>
          </section>
        ))}
      </main>
      <section
        id="order"
        className="w-full py-20 md:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 md:px-6">
          <div className="space-y-6 text-right">
            <h2 className="text-4xl font-bold animate-fade-in-down">
              اطلب الآن
            </h2>
            <p className="text-xl leading-relaxed animate-fade-in-up">
              احصل على مجموعتنا الحصرية من 6 إكسسوارات أنيقة بسعر خاص 41000 دج
              فقط. سارع قبل نفاد الكمية!
            </p>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg animate-pulse">
              <p className="text-2xl font-bold mb-2">عرض محدود الوقت!</p>
              <p className="text-xl">
                ينتهي العرض خلال: {formatTime(timeLeft)}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="mb-6 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="الاسم الأول"
                  className="w-full bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  placeholder="اسم العائلة"
                  className="w-full bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Input
                type="tel"
                placeholder="رقم الهاتف"
                className="w-full bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                placeholder="المدينة"
                className="w-full bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                onChange={handleInputChange}
                required
              />
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-indigo-600">
                  41000 دج
                </span>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  أرسل الطلب
                </Button>
              </div>
            </form>
            <p className="mt-6 text-sm text-gray-500 text-center">
              أكمل طلبك الآن واحصل على خصم إضافي 15٪! استخدم الرمز: OMNI15
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-lg mb-4">جميع الحقوق محفوظة © 2024 OmniMart</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              الشروط والأحكام
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              اتصل بنا
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
