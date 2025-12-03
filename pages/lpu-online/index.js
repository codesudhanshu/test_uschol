import Head from 'next/head';
import styles from '../../styles/lpu.module.css';
import styled from '../../styles/manipal.module.css'
import LPUbanner from "../../public/LPUbanner.jpg";
import buildpng from "../../public/Build.png";
import Holisticpng from "../../public/Holistic.png";
import Academic from "../../public/Academic.png";

import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from "next/router"; // Import useRouter 
import Script from "next/script";
// import "react-owl-carousel/dist/assets/owl.carousel.css";
// import "react-owl-carousel/dist/assets/owl.theme.default.css";
import Link from 'next/link';
import {Dot, X} from 'lucide-react'
import Image from 'next/image';
import LPUModalForm from '../../components/LPUModalForm';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

const Lpu = () =>{
   const [isVisible, setIsVisible] = useState(true); // By default open
  const [activeTab, setActiveTab] = useState("UG");
   const [selectedCourse, setSelectedCourse] = useState("PG");
    useEffect(() => {
            // Dynamically add Bootstrap CSS after Tailwind
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
            document.head.appendChild(link);
        
            return () => {
              // Remove Bootstrap CSS when leaving the page
              document.head.removeChild(link);
            };
          }, []);

          const options = {
            loop: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 },
            },
          };
        
          const approvals = [
            {
              img: "/lpu/nirf-lpu.png",
              title: "NIRF 47th Ranked",
              desc: "47th in the NIRF ranking is a significant achievement, indicating that the university is among the top 50 institutions in the country.",
            },
            {
              img: "/lpu/ugc-lpu.png",
              title: "UGC Entitled",
              desc: "UGC is a government body promoting higher education. Every university must undergo an inspection by an expert panel designated by UGC.",
            },
            {
              img: "/lpu/AICTE-lpu.png",
              title: "AICTE Accredited",
              desc: "AICTE accreditation ensures that an educational institution meets quality and standards for technical education programs.",
            },
            {
              img: "/lpu/outlook-lpu.png",
              title: "Outlook",
              desc: "Outlook India is a respected weekly news magazine covering topics like politics, society, culture, sports, and education.",
            },
            {
              img: "/lpu/qs-lpu.png",
              title: "QS World University Ranking",
              desc: "The QS World University Ranking lists the top universities worldwide, compiled by Quacquarelli Symonds (QS).",
            },
          ];

          const [loading, setLoading] = useState(false);
         const router = useRouter(); 
         const [formData, setFormData] = useState({
             name: "",
             email: "",
             phoneNumber: "",
             course:"",
             location: ""
         });
    
         const [message, setMessage] = useState("");
    
         const handleChange = (e) => {
             setFormData({ ...formData, [e.target.name]: e.target.value });
         };
    
         const handleSubmit = async (e) => {
             e.preventDefault();
             setLoading(true); // Show loader
             const response = await fetch("/api/lpu", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(formData),
             });
    
             if (response.ok) {
                 router.push("/thank-you"); // Redirect to Thank You Page
             } else {
                 const data = await response.json();
                 setMessage(data.error);
             }
         };
        
  
  
        // Hide form on scroll
        useEffect(() => {
          const handleScroll = () => setIsVisible(false);
          window.addEventListener("scroll", handleScroll);
          
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);

          const courses = [
    { name: 'MBA', href: '#All-Course' },
    { name: 'M.Com', href: '#All-Course' },
    { name: 'MCA', href: '#All-Course' },
    { name: 'MA', href: '#All-Course' },
    { name: 'M.Sc', href: '#All-Course' },
    { name: 'BCA', href: '#All-Course' },
    { name: 'BBA', href: '#All-Course' },
    { name: 'BA', href: '#All-Course' },
  ];

  const reasonsData = [
    {
      title: "Learning Pedagogy",
      icon: Holisticpng, 
      points: [
        "The university provides a mobile application to schedule your classes and the courseware.",
        "Interactive live lectures with real-time interaction with students and faculty.",
        "Get the advantage of recorded content that you can watch anytime & anywhere."
      ],
      bgColor: "white"
    },
    {
      title: "Online Examinations",
      icon: Academic, 
      points: [
        "The university provides the advantage of online exams via LMS Portal."
      ],
      bgColor: "white"
    },
    {
      title: "Proper Mentorship With Academic Advisors",
      icon: buildpng, 
      points: [
        "The classes will be taken by experienced & dedicated professors.",
        "The curriculum is also designed by industry experts."
      ],
      bgColor: "white"
    }
  ];

  const orangeCardPoints = [
    "Award-Winning LMS (Learning Management System) with interactive features",
    "Industry Oriented Curriculum Designed By Experts",
    "Personalized Mentorship with excellent guidance",
    "Placement Assistance for fulfilling career Requirement"
  ];

return(
    <>
 <Head>
 <meta name="facebook-domain-verification" content="0t0vd7zenf0jlzn3ulr9qa5nq9tf9k" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>LPU Online | Lovely Professional University | Distance Education</title>   
    <meta name="description" content="Lovely Professional University - LPU Online offers a wide range of distance education programs for BA, BCA, BCom, MBA, MCA, MCom & MSc in 2023." />
    <link rel="icon" type="image/x-icon" href="/lpu/favicon.png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css" />
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" /> */}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.green.css" />
 </Head>  
 <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        strategy="beforeInteractive"
      />

      {/* intl-tel-input */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js"
        strategy="lazyOnload"
      />
<div style={{overflow:"hidden"}}>
<div className={styles.navigation}>
    <div>
      <a href="">
        <img
          src="/lpu/cropped-download-1.png"
          alt="LOGO"
          className={styles.logo}
        />
      </a>
    </div> 
    <div>
          <button className={styles.buttons_form}   onClick={() => window.openLPUModal && window.openLPUModal()}
          >Enroll Now!</button>
    </div>
  </div>
 </div>  

<section className="home_banner section_padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="banner-content">
              <h1 className="fw-bold">LPU Online Degree Programmes</h1>
              
           <div className="courseList mb-4 flex flex-wrap gap-1">
  {courses.map((course, index) => (
    <Link
      key={index}
      href={course.href}
      className="course-link 
                  py-2 
                "
    >
      <span>{course.name}</span>
    </Link>
  ))}
</div>

              
              <p className="mb-4">
                Get UGC Entitled Degree from India&apos;s Top Ranked University
              </p>
              
              <div className="d-none d-sm-block">
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <button 
                    className="btn button_main autoClick text-white" 
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target="#brochur_download"
                    onClick={() => window.openLPUModal && window.openLPUModal()}
                  >
                    Download Brochure
                  </button>
                  
                  <button 
                    className="btn button_main" 
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target="#apply_download"
                     onClick={() => window.openLPUModal && window.openLPUModal()}
                  >
                    Apply Now
                  </button>
                </div>
                
                <h5 className="text-danger mt-1 mt-sm-4 mb-2">
                  Admission Closing In 5 Days
                </h5>
                
                {/* <small className="d-inline-block px-3 py-1 text-white bg-danger rounded">
                  Avail No Cost EMI's
                </small> */}
              </div>
            </div>
          </div>
          
          <div className="col-sm-6">
            <div className="banner_img overflow-hidden rounded">
              {/* Next.js Image component का use करें */}
              <Image
                src={LPUbanner}
                alt="LPU Online Degree Programmes Banner"
                width={600}
                height={400}
                className="img-fluid"
                priority
              />
            </div>
            
            <div className="d-block d-sm-none mt-4 text-center">
              <div className="d-flex flex-column gap-3 mb-3">
                <button 
                  className="btn button_main autoClick w-100" 
                  type="button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#brochur_download"
                     onClick={() => window.openLPUModal && window.openLPUModal()}
                >
                
                  Download Brochure
                </button>
                
                <button 
                  className="btn button_main w-100" 
                  type="button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#apply_download"
                     onClick={() => window.openLPUModal && window.openLPUModal()}
                >
                  Apply Now
                </button>
              </div>
              
              <h5 className="text-danger mt-3" style={{ fontSize: '16px' }}>
                Admission Closing In 5 Days
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>

<LPUModalForm />


  {/*  endslider */}

 <div className={styles.online_degree}>
            <h1 className={styles.htext}>Online Degree <b>Programs Offered</b></h1>
            <div className={styles.center}>
                <div className={styles.buttons_course}>
                    <button 
                        className={`${styles.button_pg} ${selectedCourse === "PG" ? styles.selected : ""}`}
                        onClick={() => setSelectedCourse("PG")}
                    >
                        PG Programs
                    </button>
                    <button 
                        className={`${styles.button_ug} ${selectedCourse === "UG" ? styles.selected : ""}`}
                        onClick={() => setSelectedCourse("UG")}
                    >
                        UG Programs
                    </button>
                    <button 
                        className={`${styles.button_ug} ${selectedCourse === "DIPLOMA" ? styles.selected : ""}`}
                        onClick={() => setSelectedCourse("DIPLOMA")}
                    >
                        Diploma Programs
                    </button>
                </div>
            </div>

            {selectedCourse === "UG" && (
                <div className={styles.ugcourse}>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/bba.jpg" className={styles.ugcourse_container_img} alt="BBA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>BBA</h2>
                            <h4 className={styles.eligibility}>Duration: 3 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 132</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 4Courses</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹22,160/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/bca.jpg" className={styles.ugcourse_container_img} alt="BCA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>BCA</h2>
                            <h4 className={styles.eligibility}>Duration: 3 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 124</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 4Courses</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹22,160/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/ba.jpg" className={styles.ugcourse_container_img} alt="BA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>BA</h2>
                            <h4 className={styles.eligibility}>Duration: 3 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 124</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 4Courses</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹14,960/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                </div>
            )}

            {selectedCourse === "PG" && (
                <div className={styles.ugcourse}>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/mba.jpg" className={styles.ugcourse_container_img} alt="MBA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>MBA (9 specializations)</h2>
                            <h4 className={styles.eligibility}>Duration: 2 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 102</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 6</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹32,960/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/mca.jpg" className={styles.ugcourse_container_img} alt="MBA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>MCA (5 specializations)</h2>
                            <h4 className={styles.eligibility}>Duration: 2 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 104</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 4</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹25,760/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/msc.jpg" className={styles.ugcourse_container_img} alt="MCOM" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>M.COM </h2>
                            <h4 className={styles.eligibility}>Duration: 2 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 84</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 6</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹18,560/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                </div>
            )}


{selectedCourse === "DIPLOMA" && (
                <div className={styles.ugcourse}>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/dba.jpg" className={styles.ugcourse_container_img} alt="DBA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>DBA</h2>
                            <h4 className={styles.eligibility}>Duration: 1 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 40</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 7</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹24,400/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                    <div className={styles.ugcourse_container}>
                        <img src="/lpu/dca.jpg" className={styles.ugcourse_container_img} alt="DCA" />
                        <div className={styles.ug_content}>
                            <h2 className={styles.benifits}>DCA</h2>
                            <h4 className={styles.eligibility}>Duration: 1 years</h4>
                            <h4 className={styles.eligibility}>Total Credits: 40</h4>
                            <h4 className={styles.eligibility}>Discipline Specific Electives : 7</h4>
                            <div className={styles.ugtenure}>
                                <h4>Fees Starting at:</h4>
                               <h2 className={styles.numbers}>₹24,400/Sem*</h2>
                            </div>
                        </div>
                        <button className={styles.apply}  onClick={() => window.openLPUModal && window.openLPUModal()}>Apply Now</button>
                    </div>
                </div>
            )}
        </div>

        

        <div className={styles.org_ad}>
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p className={styles.org_p} style={{marginTop:"10px"}}>
            Seats are filling fast! There&rsquo;s only limited seats available.
          </p>
        </div>
        <div className="col-md-4">
            {" "}
            <center>
              <button type="button" className={styles.btn2}
              onClick={() => window.openLPUModal && window.openLPUModal()}>
                Apply Now
              </button>
            </center>
        </div>
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </div>



  <section id={styles.facility}>
    <div className="container">
      <div className="row">
        <div className="col-md-6" id={styles.box}>
          <div className={styles.box_left}>
            <div className={styles.b1}>
              <p>
                <i className="fa fa-play-circle" /> Flexibility
              </p>
              <h6 className={styles.lec} style={{marginRight:"10px"}}>Live + Recorded</h6>
              <p className="box_t">
                A live lecture experience that is interactive and innovative
              </p>
            </div>
            <div className={styles.b1}>
              <p>
                <i className="fa fa-laptop" style={{marginRight:"10px"}} />
                Support
              </p>
              <h6 className={styles.lec}>Placement Support</h6>
              <p className="box_t">
                Placement assistance including CV workshops &amp; mock
                interviews
              </p>
            </div>
            <div className={styles.b1}>
              <p>
                <i className="fa fa-clock-o" style={{marginRight:"10px"}} /> Opportunities
              </p>
              <h6 className={styles.lec}>Professional Development</h6>
              <p className="box_t">
                Industry Knowledge and 360° Professional Development
              </p>
            </div>
          </div>
          {/*end of box1*/}
          <div className={styles.box_right}>
          <div className={styles.b1}>
              <p>
                <i className="fa fa-hourglass-half" style={{marginRight:"10px"}}/> Commitment
              </p>
              <h6 className={styles.lec}>8/10 Hourse Week</h6>
              <p className="box_t">Recommended hours for the programmes</p>
            </div>
              <div className={styles.b1}>
              {" "}
              <p>
                <i className="fa fa-calendar" style={{marginRight:"10px"}}/> Application Deadline with EDB
              </p>
              <h6 className={styles.lec}>Early Decision Benefits</h6>
              <p className="box_t">
                Limited Seats Available to avail Early Decision Benefit
              </p>
            </div>
              <div className={styles.b1}>
              {" "}
              <p>
                <i className="fa fa-book" style={{marginRight:"10px"}} /> Examination
              </p>
              <h6 className={styles.lec}>Online Exam</h6>
              <p className="box_t">
                Live monitoring of online proctored exams through Artificial
                Intelligence
              </p>
            </div>
          </div>
          {/*end of box1*/}
        </div>
        <div className="col-md-1" />
        <div className="col-md-5 col-sm-12">
          <div id={`${styles.form_ftr} form-ftr`}>
            <h3 className={styles.frm_heading}>Free Counseling</h3>
            <center>
              <p>Have Doubt? Talk FREE to Our Expert</p>
            </center>
            <hr />
            <form
              method="post"
              name="form"
              id="enquiry-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                id="full_name"
                placeholder="Enter Your Name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
              />  <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />  <br />
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                className="form-control"
                placeholder="Enter your phone number"
                required
                maxLength="10"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <br />
              <select
                name="course"
                className="form-control"
                id="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="" hidden="">
                  Select Your Course
                </option>
                <option value="BA">BA</option>
                <option value="BCOM">B.COM</option>
                <option value="BCA">BCA</option>
                <option value="MBA">MBA</option>
                <option value="MA">MA</option>
                <option value="MCOM">M.COM</option>
                <option value="MSC">MSC</option>
                <option value="MCA">MCA</option>
              </select>
              <br />
              <select
                name="location"
                className="form-control"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
              >
                <option value="" hidden="">
                  Select Your State
                </option>
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
              <input
                type="hidden"
                name="source"
                id="source"
                placeholder="Enter your source"
                className="form-control"
                defaultValue="LPU"
                required=""
              />
              <br />
              <input
                type="hidden"
                name="sub_source"
                id="sub_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_source"
                id="utm_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_medium"
                id="utm_medium"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_term"
                id="utm_term"
                className="form-control"
                defaultValue=""
              />
              <center>
              <button
                  type="submit"
                  name="submit"
                  className={styles.sub_btn}
                  disabled={loading} // Disable while loading
                >               
                  {loading ? (
                    <div className={styles.loader}></div> // Show loader when loading is true
                  ) : (
                    "Submit"
                  )}
              </button>

              </center>
            </form>
          </div>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
      <br />
      <hr />
    </div>
    {/*end of container*/}
  </section>

  <section id="advantage">
    <div className="container">
      <div className="row"  >
        <div className="col-md-3 pr-1">
          <h2 className={styles.adv_h}>
            4 Reason
            <br /> To Pursue Online MBA <br />
            <span className={styles.sp} style={{color: "#FF6600"}}>From LPU</span>
          </h2>
        </div>
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>

  <section className={styled.onlyonphone} style={{overflow:'hidden'}}>
  <div className={`${styled.containerfluid}`} >
            <div className="row" >
              <div className="col-lg-12">
                <div className={styled.horizontal_timeline}>
                  <ul className={`list-inline ${styled.items}`}>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          1
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         A top-notch curriculum & Exceptional faculty
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                         An industry-oriented curriculum, designed by academic experts and industry leaders, is taught by highly experienced professors, ensuring practical knowledge.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          2
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         An interactive learning management system (LMS)
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       The best interactive LMS should offer personalized learning paths for students. This can allow students to learn in a way that is best suited to their learning style.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          3
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                        Support for placements and other career goals
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                      Strong support for placements and career goals can provide students with access to job opportunities, internships, and other resources that can help them launch their careers.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                           className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                           4
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                      A mentoring program for personalized learning
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       Mentorship provides students with valuable career guidance and advice based on their own experiences in the industry to succeed in a student&rsquo;s chosen field.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
</section>
<section className={`${styled.notmobb}${styles.cont}`} style={{overflow:'hidden',padding:"5em 3em 5em 0em"}} id={styles.phonenod}>
<div className={`${styled.containerfluid}`} >
            <div className="row" >
              <div className="col-lg-12">
                <div className={styled.horizontal_timeline}>
                  <ul className={`list-inline ${styled.items}`}>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          1
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         A top-notch curriculum & Exceptional faculty
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                         An industry-oriented curriculum, designed by academic experts and industry leaders, is taught by highly experienced professors, ensuring practical knowledge.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          2
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                         An interactive learning management system (LMS)
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       The best interactive LMS should offer personalized learning paths for students. This can allow students to learn in a way that is best suited to their learning style.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                          className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                          3
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                        Support for placements and other career goals
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                      Strong support for placements and career goals can provide students with access to job opportunities, internships, and other resources that can help them launch their careers.
                        </p>
                      </div>
                    </li>
                    <li className={`list-inline-item ${styled.items_list}`}>
                      <div className="px-4">
                        <div
                           className={`${styled.event_date} badge bg-info  text-white`}
                          style={{
                            backgroundColor: "#FF6600",
                            fontSize: 16,
                            padding: 6
                          }}
                        >
                           4
                        </div>
                        <h5
                          className="pt-2"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600
                          }}
                        >
                      A mentoring program for personalized learning
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 16,
                            color: "#000"
                          }}
                        >
                       Mentorship provides students with valuable career guidance and advice based on their own experiences in the industry to succeed in a student&rsquo;s chosen field.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
</section>

  <section
    id="programmes-st"
    style={{
      backgroundImage: "url(/lpu/LPU-imag-4.jpg)",
      backgroundSize: "cover"
    }}
    className='pt-5'
  >
     <div className="container">
      <div className="row">
        <div className="col-md-7" id={styles.program_box}>
          <h4 className={styles.pr_h}>Online Programme Offered</h4>
          <p>Get a high-stature degree on completion of your programme.</p>
          <br />
          <div className="box2">
            {/* Tab Buttons */}
            <button
              onClick={() => setActiveTab("UG")}
              className={`${styles.tabButton} ${activeTab === "UG" ? styles.tabButtonActive : ""}`}
            >
              Under-Graduate Course
            </button>
            <button
              onClick={() => setActiveTab("PG")}
              className={`${styles.tabButton} ${activeTab === "PG" ? styles.tabButtonActive : ""}`}
            >
              Post-Graduate Course
            </button>

            {/* UG Courses */}
            {activeTab === "UG" && (
              <div>
                <table className={styles.table}>
                  <tbody className={styles.tbody}>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>BA :</span> Bachelor of Arts
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>BCA :</span> Bachelor of Computer Application
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>BBA :</span> Bachelor of Business Administration
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* PG Courses */}
            {activeTab === "PG" && (
              <div>
                <table>
                  <tbody>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MA :</span> Master of Arts
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MBA :</span> Master of Business Administration
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MCA :</span> Master of Computer Application
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>M.COM :</span> Master of Commerce
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.sp} style={{ color: "#FF6600" }}>MSc :</span> Master of Science
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* Empty column for spacing */}
        <div className="col-md-5"></div>
      </div>
    </div>
    {/*end of container*/}
  </section>

  
  <div className={styles.features}>
    <div className="container">
      <div className="row">
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-1.png" className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>12+ Hours</h5>
          <p className={styles.p_feature}>
            Live Course Instruction
            <br /> Per Semester
          </p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-2.png"  className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>20+ Hours</h5>
          <p className={styles.p_feature}>
            Recorded course content
            <br /> per semester
          </p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-3.png"  className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>104</h5>
          <p className={styles.p_feature}>
            Total number of
            <br /> credits
          </p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.f_mobile}`}>
          <img src="/lpu/icon-4.png" className={styles.feature_img} />
          <br />
          <h5 style={{color:"white"}}>08 Electives</h5>
          <p className={styles.p_feature}>
            General and Discipline
            <br /> Specific Elective
          </p>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of features*/}
  </div>
  <section id={styles.certificate}>
    <div className="container">
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-5">
          <img
            src="/lpu/LPU certificate MBA.png"
            className={styles.certificate}
          />
        </div>
        {/*end of col*/}
        <div className="col-md-5">
          <h3 className={styles.cer_h}>
            Get <span className={styles.sp} style={{color: "#FF6600"}}>UGC Entitled </span>Degree Which Enhance
            Your career
          </h3>
          <br />
          <img
            src="/lpu/degree from top ranked.png"
            className={styles.cr_icon}
            align="left"
            style={{marginRight:"1em"}}
          />
          <h6 className={styles.cer_hh} >Degree from Top Ranked University</h6>
          <p className={styles.cer_p}>
            Obtain a high-status degree from India&rsquo;s top universities when you
            complete your programme
          </p>
          <hr />
          <img
            src="/lpu/Universally Accepted.png"
            className={styles.cr_icon}
            align="left"
            style={{marginRight:"1em"}}
          />
          <h6 className={styles.cer_hh}>Universally Accepted</h6>
          <p className={styles.cer_p}>
            It is a globally recognized degree, which has been duly endorsed by
            the UGC
          </p>
          <hr />
          <img
            src="/lpu/No Difference From Campus Programme Degree.png"
            className={styles.cr_icon}
            align="left"
            style={{marginRight:"1em"}}
          />
          <h6 className={styles.cer_hh}>No Difference From Campus Programme Degree</h6>
          <p className={styles.cer_p}>
            The degree is recognized by statutory bodies and is treated equally
            with regular degrees
          </p>
          <br />
            
            <button type="button" className={styles.btn1}
            onClick={() => window.openLPUModal && window.openLPUModal()}>
              Apply Now
            </button>
        </div>
        {/*end of col*/}
        <div className="col-md-1" />
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.approvals}>
      <div className="container">
        <h2 className={styles.apr_hd}>Approved & Recognized by</h2>
        <OwlCarousel className="owl-theme" {...options}>
          {approvals.map((item, index) => (
            <div key={index} className={styles.item}>
              <img src={item.img} width="100%" alt={item.title} />
              <h6 className={styles.apr_h}>{item.title}</h6>
              <p className={styles.ap_p}>{item.desc}</p>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  <section
    id="about"
    style={{
      backgroundImage: "url(/lpu/lpu-black-White.png)",
      backgroundSize: "cover"
    }}
  >
    <br />
    <div className="container" id={styles.abt_ct}>
      <div className="row">
        <div className="col-md-12">
          <h2 className={styles.abt_h}>
            <strong>
              <span className={styles.sp} style={{color: "#FF6600"}}>About </span>- Why Join LPU
            </strong>
          </h2>
          <p className={styles.abt_p}>
            Lovely Professional University (LPU) is one of the leading
            universities in India, established in 2005 which offers high-quality
            education to students from across the country. The university is
            known for its focus on providing a holistic learning experience that
            goes beyond academic education. At LPU, students are not only
            equipped with the knowledge and skills necessary to succeed in their
            chosen fields but they are also provided with many opportunities to
            develop their personal and professional skills.
          </p>
        </div>
      </div>
      {/*end of row*/}
      <div className="row">
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/3000students.png" />
          </center>
          <h3 className={styles.abt_h}>30000+</h3>
          <p className={styles.abt_pp}>STUDENTS</p>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/50kalumini1.png" />
          </center>
          <h3 className={styles.abt_h}>50k+</h3>
          <center>
            <p className={styles.abt_pp}>ALUMNI</p>
          </center>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/600CAMPUSEVENT.png" />
          </center>
          <h3 className={styles.abt_h}>600+</h3>
          <center>
            <p className={styles.abt_pp}>CAMPUS EVENTS</p>
          </center>
        </div>
        {/*end of col*/}
        <div className={`col-md-3 ${styles.abt_sec}`}>
          <center>
            <img src="/lpu/600PROFILEVISITOR.png" />
          </center>
          <h3 className={styles.abt_h}>600+</h3>
          <center>
            <p className={styles.abt_pp}>HIGH PROFILE VISITOR</p>
          </center>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id="recruiter">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className={styles.abt_h}>
            <strong>
              <span className={styles.sp} style={{color: "#FF6600"}}>Top Recruiter</span> Companies
            </strong>
          </h2>
          <div className={styles.desk_img}>
            <img src="/lpu/recruiters-desktop.png" width="100%" />
          </div>
          <div className={styles.mob_img}>
            <img src="/lpu/recruiters-mobile.png" width="100%" />
          </div>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.gr_info}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className={styles.gr_h}>
            <strong>
              <span className={styles.sp} style={{color: "#FF6600"}}>Hear From</span> Real Student
            </strong>
          </h3>
          <p>What our Former Students have to say about our online LPU</p>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <div className="fixed bottom-6 right-6 z-50">
        <Link href="https://wa.me/+918287221880" target="_blank" >
          <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
        </Link>
      </div>
      
  <section id={styles.footer_frm}>
    <div className="container" id={styles.cnt_frm}>
      <div className="row">
        <div className="col-md-6">
          <img src="/lpu/for popup.png" width="100%" />
        </div>
        {/*end of col*/}
        <div className="col-md-1" />
        <div className="col-md-4">
          <br />
          <div id={`${styles.form_ftr} form-ftr`}>
            <h3 className={styles.frm_heading}>Free Counseling</h3>
            <center>
              <p>Have Doubt? Talk FREE to Our Expert</p>
            </center>
            <hr />
            <form
              method="post"
              name="form"
              id="enquiry-form"
              onSubmit={handleSubmit}
            > <br />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
              /> <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
              /> <br />
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                maxLength="10"
                className="form-control"
                placeholder="Enter your phone number"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              /> <br />
              <select
                name="course"
                className="form-control"
                id="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="" hidden="">
                  Select Your Course
                </option>
                <option value="BA">BA</option>
                <option value="BCOM">B.COM</option>
                <option value="BCA">BCA</option>
                <option value="MBA">MBA</option>
                <option value="MA">MA</option>
                <option value="MCOM">M.COM</option>
                <option value="MSC">MSC</option>
                <option value="MCA">MCA</option>
              </select> <br />
              <select
                name="location"
                className="form-control"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
              > 
                <option value="" hidden="">
                  Select Your State
                </option>
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
              <input
                type="hidden"
                name="source"
                id="source"
                placeholder="Enter your source"
                className="form-control"
                defaultValue="LPU"
                required=""
              />
              <br />
              <input
                type="hidden"
                name="sub_source"
                id="sub_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_source"
                id="utm_source"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_medium"
                id="utm_medium"
                className="form-control"
                defaultValue=""
              />
              <input
                type="hidden"
                name="utm_term"
                id="utm_term"
                className="form-control"
                defaultValue=""
              />
              <center>
              <button
                  type="submit"
                  name="submit"
                  className={styles.sub_btn}
                  disabled={loading} // Disable while loading
                >               
                  {loading ? (
                    <div className={styles.loader}></div> // Show loader when loading is true
                  ) : (
                    "Submit"
                  )}
              </button>
              </center>
            </form>
          </div>{" "}
        </div>
        {/*end of col*/}
        <div className="col-md-1" />
      </div>
      {/*end of row*/}
    </div>
    {/*end of container*/}
  </section>
  <section id={styles.footer}>
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img src="/lpu/footer-logo.png" width="70%" />
          <br />
          <p>
            LPU is a university in India. The University was established in
            2005. It belongs to one of the top distance universities and is also
            approved by the UGC. Online LPU admission in undergraduate and
            postgraduate courses via online learning.
          </p>
        </div>
        {/*end of col*/}
        <div className="col-md-3">
          <p className={styles.ftr_h}>More courses</p>
          <li>BA</li>
          <li>BCA</li>
          <li>BBA</li>
          <li>MA</li>
          <li>
            <a href="https://upschol.com/lpu-online-learning-plateform">MBA</a>
          </li>
          <li>MCA</li>
          <li>M.COM</li>
          <li>MSc</li>
        </div>
        {/*end of col*/}
        <div className="col-md-3">
          <p className={styles.ftr_h}>Recognization &amp; Approvals</p>
          <p>
            University Grant commision (UGC) Distance Education Beurea (DEB)
            National Institutional Ranking Framework (NIRF) All India Council
            for Technical Education (AICTE) The World University Ranking 2022
            Outlook ICARE Ranking 2021
          </p>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
      <br />
      <br />
      <div className="row">
        <div className="col-md-5">
          <p className={styles.ftr_h}>Contact Us</p>
          <p>
            Centre for Distance and Online Education, Lovely Professional
            University, Jalandhar - Delhi G.T. Road, Phagwara, Punjab (India),
            144411
          </p>
        </div>
        {/*end of col*/}
        <div className="col-md-4">
          <p className={styles.ftr_h}>Make A Step Towards A Success Journey</p>
          <p>
            <strong>
              Have Any Query?
              <br />
            </strong>{" "}
            Take Acaedmic Mentor Guidance
          </p>
        </div>
        {/*end of col*/}
        <div className="col-md-3">
            {" "}
            <button type="button" className={styles.footer_btn} onClick={() => {
                const fnameInput = document.getElementById("name");
                
                if (fnameInput) {
                  fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
                  fnameInput.focus(); // Instant focus without delay
                }
              }}>
              <i className="fa fa-phone" /> &nbsp;&nbsp;&nbsp;Request a Call
              Back
            </button>
        </div>
        {/*end of col*/}
      </div>
      {/*end of row*/}
      <hr className={styles.footer_hr} />
      <p className={styles.copyright}>
        © 2025 Copyright Lovely Professional University
      </p>
    </div>
    {/*end of container*/}
  </section>
  <style jsx>{`

.modal-dialog-scrollable .modal-body::-webkit-scrollbar {
    width: 8px;
}

.modal-dialog-scrollable .modal-body::-webkit-scrollbar-track {
    -webkit-box-shadow: inherit;
}

.modal-dialog-scrollable .modal-body::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 1px solid #eee;
}

.button_main {
    background: #f58220;
    color: #fff;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
}

.btn:hover {
    color: #fff;
}

.ranked-img img {
    width: auto !important;
}

.ranked-img {
    border-radius: 10px;
    width: 165px;
    overflow: hidden;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

header {
    box-shadow: 0px 3px 9px #eee;
}

.seciton_padding {
    padding: 65px 0;
}

.banner-content p {
    font-size: 19px;
    margin-top: 21px;
}

.banner-content h1 {
    font-size: 47px;
}

.ranked-body {
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    font-size: 14px;
    padding-left: 50px;
    padding-right: 12px;
    height: 125px;
    display: flex;
    align-items: center;
}

.top_ranked {
    background: aliceblue;
}

.headingbox {
    margin-bottom: 50px;
}

.headingbox p {
    font-size: 18px;
    margin-top: 12px;
}

.reason_card h5 {
    color: #444;
}

.reason_text {
    font-size: 14px;
}

.reason_icon {
    color: #22c55e;
}

.reason_card {
    background: #fff;
    box-shadow: 0px 7px 11px #ddd;
    border-radius: 10px;
    padding: 30px 15px 60px;
    border-top: 1px solid #eee;
    height: 100%;
    position: relative;
}

.certificate {
    position: absolute;
    top: -37px;
    left: 0;
    width: 100%;
    height: 113%;
    box-shadow: 0px 7px 11px #00000014;
    border-radius: 5px;
    overflow: hidden;
}

.reason_card.orange_bg {
    background: #f5822a;
}

.reason_card.orange_bg li {
    color: #fff;
    margin-bottom: 23px;
}

.footer_reason {
    position: absolute;
    bottom: 15px;
    width: 90%;
}

.footer_reason .button_main {
    width: 100%;
}

section.certificate_sec {
    background: #f58220;
    color: #fff;
}

ul.certificat_list li {
    margin-bottom: 12px;
    font-weight: 600;
}

ul.certificat_list li small {
    font-weight: 400;
    font-size: 14px;
}

ul.certificat_list {
    border-left: 2px solid;
    list-style: none;
    margin-left: 15px;
}

.specialization_card {
    box-shadow: 0px 9px 11px #00000029;
    border-radius: 10px;
    overflow: hidden;
    color: #555;
}

.specialization_card h5 {
    color: #333;
    margin-bottom: 25px;
    font-weight: 600;
}

.special_text {
    font-size: 14px;
}

.special_text span {
    font-weight: 600;
}

.admission_sec {
    background: #f8f8f8;
}

.steps_card {
    width: 33.3%;
    text-align: center;
    padding: 0 5px;
    color: #505050;
}

a.btn.bg-white:hover {
    color: #333;
}

.steps_card p {
    font-size: 14px;
    padding: 0px 5px;
}

.steps_card:before {
    content: '';
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    border: 1px solid #fb5d28;
}

.steps_card span {
    display: block;
    margin-bottom: 35px;
}

.steps_card span:after {
    border: 2px solid #fb5d28;
    width: 20px;
    height: 20px;
    background-color: #fff !important;
    top: 8px !important;
}

.steps_card span:before,
.steps_card span:after {
    content: '';
    position: absolute;
    top: 100%;
    background: #fb5d28;
    border-radius: 50px;
    transform: translate(-50%, 115%);
    left: 50%;
}

.steps_card span:before {
    height: 10px;
    width: 10px;
    z-index: 10;
}

.ourLearner .item {
    border: 1px solid #eee;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px;
    filter: grayscale(1);
    cursor: pointer;
    transition: all ease-in-out;
}

.ourLearner .item:hover {
    filter: grayscale(0);
}

.tollfree_sec {
    background: #f58220;
}

.common_form .form-control {
    height: 41px;
    margin-bottom: 15px;
}

.common_form form {
    padding: 0px 30px 25px;
}

.form_img {
    height: 103%;
    position: absolute;
    left: -4px;
    top: -15px;
}

.form_img img {
    height: 100%;
    object-fit: cover;
}

.sticky-footer button {
    width: 50%;
    margin: 0;
}

.sticky-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
}

section.reason_sec.seciton_padding {
    padding-bottom: 85px;
}

.fee_card {
    width: 40%;
    padding: 25px;
}

.feecard_first {
    width: 20%;
}

.fee_card h4 {
    color: #f58220;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background-color: #f58220;
}

.nav-pills .nav-link {
    color: #f58220;
    font-weight: 500;
    border: 1px solid;
}

div#pills-tabContent label i {
    position: absolute;
    left: 0;
    color: #f58220;
    top: 5px;
}

div#pills-tabContent label {
    position: relative;
    padding-left: 30px;
    margin-top: 25px;
    font-weight: 300;
    font-size: 14px;
}

section.banner-thanku {
    overflow: hidden;
}

section.banner-thanku:before {
    content: '';
    position: absolute;
    inset: 0;
    background: #0000008c;
}

.logo-thanku {
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 10;
    background: #fff;
    width: 200px;
}

section.banner-thanku img {
    width: 100%;
}

.banner_tnq p {
    font-size: 21px;
}

.banner_tnq h1 {
    font-weight: 800;
    font-size: 50px;
}

.banner_tnq {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
}

a.callnowtnq {
    background: linear-gradient(161.7deg, #f7415f -8.74%, #fe734e 94.03%);
    color: #fff;
    border: 2px solid;
    padding: 10px;
    display: block;
    border-radius: 5px;
    letter-spacing: 1px;
    transition: all .3s ease-in-out;
}

.testimonial-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 7px 9px #00000024;
}

.testi_img {
    height: 210px;
}

.test_body {
    padding: 35px 15px 25px;
    position: relative;
}

.test_body p {
    font-weight: 300;
    font-size: 14px;
}

button.watchvideo {
    background: transparent;
    cursor: pointer;
    padding: 5px 12px;
    border-radius: 10px;
    border: 2px solid;
    color: #ff280a;
}

.test_body .fa.fa-play {
    display: flex;
    width: 45px;
    height: 30px;
    background: red;
    color: #fff;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    position: absolute;
    top: -15px;
    cursor: pointer;
}

.backtohome {
    text-align: center;
    padding: 25px 0;
}

.backtohome a {
    border: 2px solid red;
    border-radius: 25px;
    padding: 3px 12px;
    color: red;
    transition: all .3s ease-in-out;
}

a:hover,
a {
    text-decoration: none;
}

section.ranking-sec {
    background: aliceblue;
    padding: 65px 0;
}

.ranking-box {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0px 5px 9px #00000024;
}

.testimonial-sec .btn-close {
    position: absolute;
    top: 0px;
    right: 0;
    font-weight: 100;
    width: 20px;
    height: 20px;
    background: #f00;
    opacity: 1;
    z-index: 9;
    color: #fff;
    transition: all .3s ease-in-out;
    border: transparent;
    font-size: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
}

section.sample-certificate {
    background: #ea580c;
    color: #fff;
}

.certificate_box {
    position: absolute;
    top: 50%;
    box-shadow: 0px 5px 9px #0000002e;
    left: 50%;
    transform: translate(-50%, -50%);
}

.certificate-content ul p {
    font-size: 14px;
}

.certificate-content {
    padding: 60px 0px 60px 30px;
}

.certificate-content ul {
    border-left: 2px solid;
    padding-left: 18px;
    list-style: none;
}

.courseList span {
    font-size: 14px;
    color: #f58220;
    border: 1px solid;
    padding: 3px 10px;
    border-radius: 18px;
    font-weight: 600;
}

ul#pills-tab .nav-link {
    color: #f58220;
    border: 1px solid;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: #fff !important;
    background: #f58220;
}

.course_card {
    box-shadow: 0px 9px 11px #00000014;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
}

.course_card p {
    color: #575757;
    font-size: 14px;
}

.course_card p i {
    font-size: 18px;
    margin-right: 5px;
}

section.specialization_sec {
    padding: 65px 0;
}

`}
  </style>
</>
)
}

export default Lpu
