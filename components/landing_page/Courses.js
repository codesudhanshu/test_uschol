import React, { useEffect, useState } from "react";
import Course1SVG from "../../public/assets/landing-page/svgs/courses/1.svg";
import Course2SVG from "../../public/assets/landing-page/svgs/courses/2.svg";
import Course3SVG from "../../public/assets/landing-page/svgs/courses/3.svg";
import Course4SVG from "../../public/assets/landing-page/svgs/courses/4.svg";
import NextArrowSVG from "../../public/assets/landing-page/svgs/next-arrow.svg";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

const Courses = ({ categories, tags, isMobile }) => {
	const router = useRouter();
	const exceptions = ['UG', 'PG'];
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All Courses");
	const allTags = Object.values(tags).flat();

	
	function transformText(text) {
		const words = text.split(' ');
		const capitalizedWords = words.map(word => {
			if (exceptions.includes(word.toUpperCase())) {
				return word.toUpperCase();
			} else {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			}
		});
		return capitalizedWords.join(' ');
	}

	function TagCard({
		tag,
		index
	}) {
		return (
			<div
	onClick={() => router.push(`/colleges?tagId=${tag._id}`)}
	className="p-2 md:p-3 h-[140px] md:h-full rounded-md flex flex-col justify-between border border-gray-200 bg-white hover:shadow-md shadow-[#FFF0CA] cursor-pointer transition-transform duration-300 hover:scale-105 relative"
>
	<div className="w-full flex justify-between items-start">
		<div className="w-1/2 relative">
			{index % 4 === 0 && (
				<Image
					alt="Tag Icon"
					src={Course1SVG}
					className="w-4 h-4 md:w-8 md:h-8"
					width={64}
					height={64}
				/>
			)}
			{index % 4 === 1 && (
				<Image
					alt="Tag Icon"
					src={Course2SVG}
					className="w-4 h-4 md:w-8 md:h-8"
					width={64}
					height={64}
				/>
			)}
			{index % 4 === 2 && (
				<Image
					alt="Tag Icon"
					src={Course3SVG}
					className="w-4 h-4 md:w-8 md:h-8"
					width={64}
					height={64}
				/>
			)}
			{index % 4 === 3 && (
				<Image
					alt="Tag Icon"
					src={Course4SVG}
					className="w-4 h-4 md:w-8 md:h-8"
					width={64}
					height={64}
				/>
			)}
		</div>
		<p className="text-[9px] md:text-xs bg-secondary rounded-full px-2 py-[2px]">
			{tag?.duration} {tag?.duration_unit}
		</p>
	</div>

	<div className="flex flex-col gap-1 mt-2">
		<p className="text-[10px] md:text-xs text-primary">
			{tag?.collegeCount} Colleges
		</p>
		<h3 className="text-[11px] md:text-sm font-semibold text-[#101828]">
			{tag?.tag_name}
		</h3>
	</div>

	<Image
		alt="Next Arrow"
		src={NextArrowSVG}
		className="w-3 h-3 md:w-6 md:h-6 absolute bottom-2 right-2"
		width={24}
		height={24}
	/>
</div>

		)
	}

	return (
		<section id="tabSection" className="my-8 2xl:my-12 w-full z-10 relative">
			<div className="container mx-auto flex flex-col items-center">
				<div className="title mx-auto">
					<h1 className="text-center mt-4 ">
						<span className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText">
							Fostering a playful & engaging learning environment
						</span>
					</h1>
				</div>
				<div
					className="w-full mt-4 lg:mt-8"
				>
					<div
						className="courses flex items-center gap-x-6 md:gap-x-12 lg:gap-x-16 justify-between overflow-x-auto "
					>
						<div
							className="flex-shrink-0 grow-0"
						>
							<div
								className="flex flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer"
								onClick={() => {
									setSelectedCategory("All Courses");
								}}
								style={{
									backgroundColor: selectedCategory === "All Courses" ? "white" : "transparent",
								}}
							>
								<p
									className={`font-medium text-md md:text-lg text-${selectedCategory === "All Courses" ? 'primary' : 'white'}`}
								>
									All Courses
								</p>
							</div>
						</div>
						{
							categories?.map((category, index) => (
								<div
									key={category}
									className="flex-shrink-0 grow-0"
								>
									<div
										className="flex  items-center justify-center px-4 py-2 rounded-lg cursor-pointer"
										onClick={() => {
											setSelectedCategory(category);
										}}
										style={{
											backgroundColor: selectedCategory === category ? "white" : "transparent",
										}}
									>
										<p
											className={`font-medium text-md md:text-lg block text-${selectedCategory === category ? "primary" : "white"}`}
										>
											{transformText(category)}
										</p>
									</div>
								</div>
							))
						}
					</div>
				</div>
				<div
					className="w-full mt-6"
				>
					<Row gutter={[16, 16]}>
						{selectedCategory !== "All Courses"
							? (isExpanded
								? tags[selectedCategory]?.map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
								: tags[selectedCategory]?.slice(0, isMobile ? 4 : 8).map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
							)
							: (isExpanded
								? allTags?.map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
								: allTags?.slice(0, isMobile ? 4 : 8).map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
							)}
					</Row>
					{
						(selectedCategory !== "All Courses" ? tags[selectedCategory]?.length : allTags?.length) > (isMobile ? 3 : 8) && (
							<div
								className="flex items-center justify-center mt-8"
							>
								<button
									className="px-4 py-2 rounded-lg border-2 border-white hover:shadow-lg shadow-[#FFBA08] cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center gap-x-2"
									onClick={() => setIsExpanded(!isExpanded)}
								>
									{
										isExpanded ? (
											<p
												className="text-base md:text-lg font-medium text-white"
											>
												View Less
											</p>
										) : (
											<p
												className="text-base md:text-lg font-medium text-white"
											>
												View More
											</p>
										)
									}
									<FaArrowRightLong
										className="text-white text-base md:text-lg"
									/>
								</button>
							</div>
						)
					}

				</div>
			</div>
		</section >
	);
};

export default Courses;
