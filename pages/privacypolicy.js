// // import MissionIcon from "../../public/images/about-us/mission-icon.svg";
// import MissionIcon from "../public/images/about-us/mission-icon.svg";

// import VisionIcon from "../public/images/about-us/vision-icon.svg";
// import AboutUsBG from "../public/images/about-us/page-bg.svg";
// import Image from "next/image";
// import { Col, Row, Typography } from "antd";

// export default function Privacypolicy() {
// 	return (
// 		<main className="bg-background_color p-2">
// 			<div
// 				id="about-us"
// 				className="relative overflow-hidden w-full"
// 			>
// 				<div
// 					className="z-1 flex flex-col justify-center items-centerc container pb-12"
// 				>
// 					<div className="title mx-auto">
// 						{/* <h3 className="text-primary text-center text-base font-Poppins font-semibold">
// 							Privacy Policy
// 						</h3> */}
// 						<h1
// 							className="text-center text-3xl font-Poppins font-semibold my-2 text-white"
// 						>
// 							Privacy Policy
// 						</h1>
// 						<p className="text-center text-base lg:text-lg px-8 lg:px-52 mt-4 text-secondary"
// 						>
// 							Welcome to UpSchol! Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website,{' '} 
//                             <a href="https://www.upschol.com/" style={styles.link}>
//                                 https://www.upschol.com
//                                     </a>
// 						</p>
// 					</div>
// 					<Row
// 						className="w-full mt-12"
// 						align={"top"}
// 						gutter={[16, 16]}
// 					>
// 						<Col
// 							xs={24}
// 							md={12}
// 							className="flex flex-col justify-center items-center px-2 lg:px-4 text-white"
// 						>
// 							<Image
// 								src={MissionIcon}
// 								alt="Mission Icon"
// 								quality={100}
// 							/>
// 							<h1
// 								className="text-3xl font-Poppins font-semibold text-center mt-4"
// 							>
// 								Our Mission
// 							</h1>
// 							<p className="text-center text-base lg:text-lg mt-4"
								
// 							>
// 								To offer correct information and guidance to those pursuing higher education online or seeking upskilling opportunities. We aim to reach every corner, making people aware of the benefits of online education and serving society through excellence, leadership, and scholarships for all.
// 							</p>
// 						</Col>
// 						<Col
// 							xs={24}
// 							md={12}
// 							className="flex flex-col justify-center items-center px-4 lg:px-6 text-white"
// 						>
// 							<Image
// 								src={VisionIcon}
// 								alt="Vision Icon"
// 								quality={100}
// 							/>
// 							<h1
// 								className="text-3xl font-Poppins font-semibold text-center mt-4"
// 							>
// 								Our Vision
// 							</h1>
// 							<p className="text-center text-base lg:text-lg mt-4"
								
// 							>
// 								To create a platform that guides individuals in making informed decisions about their higher education journey. We strive to simplify the online education landscape, making it accessible to all, including those facing financial constraints.
// 							</p>
// 						</Col>
// 					</Row>
// 				</div>
// 				<Image
// 					src={AboutUsBG}
// 					alt="About Us Background"
// 					quality={100}
// 					className="object-contain absolute z-0 bottom-0 right-0"
// 				/>
// 			</div>
// 		</main>
// 	);
// }

// const styles = {
// 	container: {
// 		fontFamily: 'YourWebsiteFont, sans-serif',
// 		margin: '0 auto',
// 		padding: '20px',
// 		maxWidth: '800px',
// 		color: '#ffffff',

// 	},
// 	title: {
// 		textAlign: 'center',
// 		fontSize: '2.5em',
// 		marginBottom: '0.5em',
// 		color: '#ffffff',

// 	},
// 	content: {
// 		fontSize: '1.1em',
// 		lineHeight: '1.6',
// 		marginBottom: '1em',
// 		color: '#ffffff',

// 	},
// 	link: {
// 		color: '#ffffff',
// 		textDecoration: 'none',
// 	},
// };

// import MissionIcon from "../../public/images/about-us/mission-icon.svg";
import MissionIcon from "../public/images/about-us/mission-icon.svg";
import VisionIcon from "../public/images/about-us/vision-icon.svg";
import AboutUsBG from "../public/images/about-us/page-bg.svg";
import Image from "next/image";
import { Col, Row, Typography } from "antd";

export default function Privacypolicy() {
	return (
		<main className="bg-background_color p-2">
			<div id="about-us" className="relative overflow-hidden w-full">
				<div className="z-1 flex flex-col justify-center items-center container pb-12">
					<div className="title mx-auto">
						<h1 className="text-center text-3xl font-Poppins font-semibold my-2 text-white">
							Privacy Policy
						</h1>
						<p className="text-center text-base lg:text-lg px-8 lg:px-52 mt-4 text-secondary">
							Welcome to UpSchol! Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website,{' '}
							<a href="https://www.upschol.com/" style={styles.link}>
								https://www.upschol.com
							</a>
						</p>
					</div>

					{/* Privacy Policy Details */}
					<div className="privacy-policy text-white px-8 lg:px-52 mt-12">
						<h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
						<ul className="mb-8 space-y-2">
							<li>
								<strong>Personal Information:</strong> Name, email address, phone number, and other details you provide when signing up or contacting us.
							</li>
							<li>
								<strong>Usage Data:</strong> Information about how you interact with our website, such as pages visited and time spent on the site.
							</li>
							<li>
								<strong>Cookies and Tracking Technologies:</strong> We use cookies to improve your experience and analyze website traffic.
							</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
						<ul className="mb-8 space-y-2">
							<li>Provide and improve our services.</li>
							<li>Respond to your inquiries and support requests.</li>
							<li>Send important updates and promotional offers (you can opt out anytime).</li>
							<li>Analyze website performance and user behavior to enhance our platform.</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">3. How We Protect Your Information</h2>
						<p className="mb-8">
							We take reasonable security measures to protect your data from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.
						</p>

						<h2 className="text-xl font-semibold mb-4">4. Sharing Your Information</h2>
						<ul className="mb-8 space-y-2">
							<li>
								We do not sell your personal information. However, we may share your data with:
							</li>
							<li>
								<strong>Trusted third-party service providers:</strong> Assist in running our website and services.
							</li>
							<li>
								<strong>Legal authorities:</strong> If required by law or to protect our rights.
							</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">5. Your Choices and Rights</h2>
						<ul className="mb-8 space-y-2">
							<li>Access, update, or delete your personal information.</li>
							<li>Opt out of marketing emails and cookies.</li>
							<li>Contact us for any privacy-related concerns.</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">6. Third-Party Links</h2>
						<p className="mb-8">
							Our website may contain links to third-party websites. We are not responsible for their privacy practices, so we encourage you to review their policies.
						</p>

						<h2 className="text-xl font-semibold mb-4">7. Updates to This Policy</h2>
						<p className="mb-8">
							We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
						</p>

						<h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
						<p>
							If you have any questions about this Privacy Policy, please contact us at:
						</p>
						<ul className="mt-4 space-y-2">
							<li>Email: info@upschol.com</li>
							<li>Phone: +91-9810102541 / 9810800119 / 9810800221</li>
						</ul>
					</div>
				</div>

				<Image
					src={AboutUsBG}
					alt="About Us Background"
					quality={100}
					className="object-contain absolute z-0 bottom-0 right-0"
				/>
			</div>
		</main>
	);
}

const styles = {
	link: {
		color: '#ffffff',
		textDecoration: 'none',
	},
};

