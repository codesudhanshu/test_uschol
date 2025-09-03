import React, { useState } from 'react';
import Image from 'next/image';

export default function ScholarshipFair() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const courses = [
    {
      title: "Digital Marketing",
      description: "Digital Marketing courses equip students with in-demand skills to create effective online strategies, helping businesses grow and succeed in the rapidly evolving digital landscape.",
      icon: "💼"
    },
    {
      title: "Data Science",
      description: "Data Science courses teach valuable analytical and technical skills, enabling students to harness data for impactful decision-making and thrive in today&apos;s data-driven industries.",
      icon: "📊"
    },
    {
      title: "Film Making",
      description: "Film making courses offer creative and technical expertise, empowering students to tell compelling stories through visual media and pursue diverse careers in the entertainment industry.",
      icon: "🎬"
    },
    {
      title: "Artificial Intelligence",
      description: "AI courses provide cutting-edge knowledge in automation and machine learning, preparing students for innovative, high-growth careers in technology and data-driven industries.",
      icon: "🤖"
    },
    {
      title: "Paramedical Courses",
      description: "Paramedical courses offer hands-on medical training, equipping students with essential skills for high-demand healthcare careers and immediate job opportunities in the medical field.",
      icon: "⚕️"
    },
    {
      title: "Humanities",
      description: "Humanities delves into culture, society, and human behavior, opening up a wide range of career opportunities in areas like law, education, journalism, and social work.",
      icon: "📚"
    }
  ];

  const roadmaps = [
    {
      title: "MBA Roadmap",
      subtitle: "Build Businesses, Lead Teams",
      icon: "💼"
    },
    {
      title: "Engineering Roadmap",
      subtitle: "Solve Real-World Problems with Tech",
      icon: "⚙️"
    },
    {
      title: "Medicine & Healthcare Roadmap",
      subtitle: "Heal Lives, Lead Science",
      icon: "🏥"
    },
    {
      title: "Emerging Fields Roadmap",
      subtitle: "Break the Mold: New-Age Careers",
      icon: "🚀"
    }
  ];

  const exhibitors = [
    { name: "Amity", logo: "/amity_logo.png" },
    { name: "NMIMS", logo: "/nmims_logo.png" },
    { name: "LPU", logo: "/lpu/cropped-download-1.png" },
    { name: "MANIPAL", logo: "/lpu/manipallogo.png" },
    { name: "DPU", logo: "/logo-01.png" }
  ];

  const faqs = [
    {
      question: "What is the Upschol Scholarship Fair 2025?",
      answer: "It&apos;s India&apos;s biggest virtual scholarship fair connecting students with educational institutions and scholarship providers."
    },
    {
      question: "Who can attend the Scholarship Fair?",
      answer: "All students from 10th grade to college graduates looking for higher education opportunities."
    },
    {
      question: "What can I expect from the event?",
      answer: "Live webinars, direct interaction with college experts, scholarship opportunities, and free career guidance."
    },
    {
      question: "Why should I attend the Scholarship Fair?",
      answer: "To access scholarships up to ₹100 Cr, get personalized guidance, and explore innovative courses."
    },
    {
      question: "How do I apply for scholarships during the fair?",
      answer: "You can apply directly through our platform during the event with guidance from our experts."
    },
    {
      question: "Is there any registration fee?",
      answer: "No, the scholarship fair is completely free for all attendees."
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for registering! We will contact you soon.');
    setShowPopup(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-2xl mr-3">📅</span>
              <span className="text-white font-medium">15th September 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              India&apos;s Biggest
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                Scholarship Fair 2025
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Scholarships upto <span className="text-yellow-400 font-bold">₹100 Cr</span> • 
              Customized Options • Live Webinars with Experts
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button 
                onClick={openPopup}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Register Now (Free)
              </button>
              <button 
                onClick={openPopup}
                className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
              >
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-white font-medium">Scholarships upto ₹100 Cr</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">👥</div>
                <p className="text-white font-medium">Customized Options</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">🎥</div>
                <p className="text-white font-medium">Live Webinar</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-white font-medium">Free Career Roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About the <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Fair</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Upschol Scholarship Fair 2025 brings together students, educators, and institutions to unlock educational opportunities worth ₹100 Crore. Get personalized guidance and discover your perfect academic path.
          </p>
        </div>
      </div>

      {/* Exhibitors Section with Images */}
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Exhibitors</h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Exhibitors at Upschol Scholarship Fair 2025 showcase educational institutions, programs, and career opportunities, offering students insights and guidance for their academic and professional futures.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {exhibitors.map((exhibitor, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group min-h-[180px] text-center"
              >
                <div className="w-30 h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={exhibitor.logo}
                    alt={`${exhibitor.name} logo`}
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback && fallback.classList) {
                        fallback.style.display = 'block';
                      }
                    }}
                  />
                  <span
                    className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors hidden text-center"
                  >
                    {exhibitor.name}
                  </span>
                </div>
                <span className="font-medium text-sm text-gray-700 text-center mt-auto">
                  {exhibitor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Why Upschol?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">👥</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">30M+</h3>
            <p className="text-gray-600 font-medium text-lg">Reach</p>
          </div>
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">🏆</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">88%</h3>
            <p className="text-gray-600 font-medium text-lg">Admit Rate</p>
          </div>
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">📚</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">100K+</h3>
            <p className="text-gray-600 font-medium text-lg">Students Catered</p>
          </div>
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">🏫</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">1,100+</h3>
            <p className="text-gray-600 font-medium text-lg">Universities</p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Innovative Courses</h2>
          <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
            The Upschol Scholarship Education Fair 2025 features innovative courses designed to equip students with cutting-edge skills and knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{course.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Career Guidance Roadmap</h2>
        <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
          Feeling stuck or confused about your future? Explore these roadmaps to find clarity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmaps.map((roadmap, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">{roadmap.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{roadmap.title}</h3>
                  <p className="text-sm text-gray-600">{roadmap.subtitle}</p>
                </div>
              </div>
              <button className="flex items-center text-purple-600 font-medium mt-4 group-hover:text-purple-700 transition-colors">
                Download PDF <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="relative max-w-4xl mx-auto text-center py-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Find Your Perfect Scholarship?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">Join India&apos;s biggest scholarship fair and unlock opportunities worth ₹100 Crore.</p>
          <button 
            onClick={openPopup}
            className="bg-white text-purple-600 px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            Register Now (Free)
          </button>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative transform transition-all duration-300">
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Register for Scholarship Fair</h3>
              <p className="text-gray-600">Join India&apos;s biggest scholarship fair and unlock opportunities worth ₹100 Crore</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                Register Now (Free)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}