import MissionIcon from "../public/images/about-us/mission-icon.svg";
import VisionIcon from "../public/images/about-us/vision-icon.svg";
import AboutUsBG from "../public/images/about-us/page-bg.svg";
import Image from "next/image";
import { Col, Row, Typography } from "antd";

export default function TermsAndCondition() {
	return (
		<main className="bg-background_color p-2">
			<div id="about-us" className="relative overflow-hidden w-full">
				<div className="z-1 flex flex-col justify-center items-center container pb-12">
					<div className="title mx-auto">
						<h1 className="text-center text-3xl font-Poppins font-semibold my-2 text-white">
							Terms & Conditions
						</h1>
						<p className="text-center text-base lg:text-lg px-8 lg:px-52 mt-4 text-secondary">
							Welcome to UpSchol! By using our website, upschol.com, you agree to follow these Terms and Conditions. Please read them carefully.
						</p>
					</div>

					{/* Terms and Conditions Details */}
					<div className="terms-and-conditions text-white px-8 lg:px-52 mt-12">
						<h2 className="text-xl font-semibold mb-4">1. Use of Our Website</h2>
						<ul className="mb-8 space-y-2">
							<li>Do not use our website for illegal or harmful activities.</li>
							<li>We may change, suspend, or discontinue any part of our website at any time.</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">2. Account and Registration</h2>
						<ul className="mb-8 space-y-2">
							<li>If you create an account, you are responsible for keeping your login details secure.</li>
							<li>Provide accurate and truthful information when signing up.</li>
							<li>We have the right to suspend or terminate accounts that violate our policies.</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">3. Content and Copyright</h2>
						<ul className="mb-8 space-y-2">
							<li>All content on UpSchol is owned by us or our partners. Do not copy, distribute, or modify without permission.</li>
							<li>If you submit content (reviews, comments, etc.), you give us permission to use it.</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">4. Limitation of Liability</h2>
						<ul className="mb-8 space-y-2">
							<li>We strive to provide accurate information, but we do not guarantee that everything on our website is error-free.</li>
							<li>UpSchol is not responsible for any losses or damages resulting from using our website.</li>
						</ul>

						<h2 className="text-xl font-semibold mb-4">5. Third-Party Links</h2>
						<p className="mb-8">
							Our website may contain links to third-party sites. We are not responsible for their content or policies.
						</p>

						<h2 className="text-xl font-semibold mb-4">6. Changes to These Terms</h2>
						<p className="mb-8">
							We may update these Terms from time to time. If there are major changes, we will notify you.
						</p>

						<h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
						<p>
							If you have any questions about these Terms and Conditions, you can reach us at:
						</p>
						<ul className="mt-4 space-y-2">
							<li>Email: info@upschol.com</li>
							<li>Phone: +91-9810102541 / 9810800119 / 9810800221</li>
						</ul>

						<p className="mt-8">
							By using UpSchol, you agree to these Terms and Conditions. Thank you for being a part of our community!
						</p>
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
