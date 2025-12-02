import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function LPUModalForm() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    course: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.location || !formData.course) {
      alert('Please fill all fields');
      return;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('Please enter valid 10 digit phone number');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/lpu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/thank-you";
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
    
    setLoading(false);
  };

  // Make setShowModal available globally so buttons can access it
  React.useEffect(() => {
    window.openLPUModal = () => setShowModal(true);
  }, []);

   React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image */}
              <div className="md:w-2/5 relative hidden md:block">
                <img 
                  src="/lpu/LPU.jpg" 
                  alt="LPU" 
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              
              {/* Right Side - Form */}
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                  <img 
                    src="https://www.lpuonline.com/images/LPU-Online-Logo.svg" 
                    alt="LPU Online" 
                    className="w-40 mx-auto mb-3"
                  />
                  <h5 className="text-xl font-semibold mb-2">Get your Brochure Copy</h5>
                  <div className="flex justify-center items-center gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-1">
                      <svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-green-600">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Online Exam</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-green-600">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>100% Placement Assistance</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  
                  <input
                    type="tel"
                    name="phoneNumber"
                    maxLength={10}
                    placeholder="Enter Phone No."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  
                 <select
  name="location"
  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
  value={formData.location}
  onChange={handleChange}
>
  <option value="">Select State</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Delhi">Delhi</option>
  <option value="Bihar">Bihar</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Haryana">Haryana</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Gujarat">Gujarat</option>
  <option value="West Bengal">West Bengal</option>
  <option value="Telangana">Telangana</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Kerala">Kerala</option>
  <option value="Odisha">Odisha</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Punjab">Punjab</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="Assam">Assam</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Tripura">Tripura</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Manipur">Manipur</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Puducherry">Puducherry</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Ladakh">Ladakh</option>
</select>

                  
                  <select
                    name="course"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="MCom">MCom</option>
                    <option value="MA">MA</option>
                    <option value="MSc">M.Sc (Mathematics)</option>
                    <option value="BA">BA</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                  </select>
                  
                  <p className="text-xs text-gray-600">
                    I authorize a representative to contact me via phone and/or email. This will override registry on DND/NDNC.
                  </p>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Form - Only visible on mobile (below md breakpoint) */}
      <div className="block md:hidden bg-white p-6 shadow-lg rounded-lg mx-4 my-6">
        <div className="text-center mb-4">
          <img 
            src="https://www.lpuonline.com/images/LPU-Online-Logo.svg" 
            alt="LPU Online" 
            className="w-32 mx-auto mb-2"
          />
          <h5 className="text-lg font-semibold mb-2">Talk To Your Dedicated Counsellor</h5>
          <div className="flex justify-center items-center gap-3 text-xs mb-3 flex-wrap">
            <div className="flex items-center gap-1">
              <svg width="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-green-600">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>Online Exam</span>
            </div>
            <div className="flex items-center gap-1">
              <svg width="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-green-600">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>100% Placement Assistance</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-orange-500"
            value={formData.name}
            onChange={handleChange}
          />
          
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-orange-500"
            value={formData.email}
            onChange={handleChange}
          />
          
          <input
            type="tel"
            name="phoneNumber"
            maxLength={10}
            placeholder="Enter Phone No."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-orange-500"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          
       <select
  name="location"
  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
  value={formData.location}
  onChange={handleChange}
>
  <option value="">Select State</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Delhi">Delhi</option>
  <option value="Bihar">Bihar</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Haryana">Haryana</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Gujarat">Gujarat</option>
  <option value="West Bengal">West Bengal</option>
  <option value="Telangana">Telangana</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Kerala">Kerala</option>
  <option value="Odisha">Odisha</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Punjab">Punjab</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="Assam">Assam</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Tripura">Tripura</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Manipur">Manipur</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Puducherry">Puducherry</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Ladakh">Ladakh</option>
</select>

          
          <select
            name="course"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-orange-500"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
            <option value="MCom">MCom</option>
            <option value="MA">MA</option>
            <option value="MSc">M.Sc (Mathematics)</option>
            <option value="BA">BA</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
          </select>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? (
              <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Apply Now"
            )}
          </button>
        </div>
      </div>
    </>
  );
}