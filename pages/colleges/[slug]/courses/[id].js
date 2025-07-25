import {
	Row,
	Col,
	Typography,
	Image as AntdImg,
	Tooltip,
	Spin,
	Modal,
} from "antd";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import MajorModel from "../../../../model/major";
import dbConnect from "../../../../dbConnect";
import { FaArrowRight, FaCheckCircle, FaRegUserCircle, FaStar, FaWhatsapp } from "react-icons/fa";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { SlBadge } from "react-icons/sl";
import Slider from "react-slick";
import LeadModal from "../../../../components/lead_Modal";
import tagsModel from "../../../../model/tags";
import courseModel from "../../../../model/course";
import { useCookies } from "react-cookie";
import collegeModel from "../../../../model/collegeModel";
import { FaArrowRightLong, FaLocationDot, FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { getS3Url } from "../../../../lib/s3";

export async function getServerSideProps(context) {
	const { id } = context.params;
	await dbConnect();
	try {
		const course = await MajorModel.findById({ _id: id }).populate(
			"course_id"
		);
		if (!course) {
			return {
				notFound: true,
			};
		}
		const collageId = course.college_id;
		const college = await collegeModel.findById({ _id: collageId });
		if (!college) {
			return {
				notFound: true,
			};
		}
		const similarColleges = await collegeModel.find({
			tags: { $in: college?.tags },
			_id: { $ne: college?._id }
		}).populate([{ path: "banner_image", model: 'file' }]);
		const tags = await tagsModel.find({});

		return {
			props: {
				majors: JSON.parse(JSON.stringify(course)),
				tags: JSON.parse(JSON.stringify(tags)),
				similarColleges: JSON.parse(JSON.stringify(similarColleges)),
				college: JSON.parse(JSON.stringify(college))
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				majors: {},
			},
		};
	}
}


export default function Course(props) {
	const router = useRouter();
	const [cookies] = useCookies(['user']);
	const { slug } = router.query;
	const [data, setData] = useState({});
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);
	const [specialization, setSpecialization] = useState([]);
	const [selectedFAQ, setSelectedFAQ] = useState(null);
	const [showLeadModal, setShowLeadModal] = useState(false);
	const [selectedURL, setSelectedURL] = useState(null);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const whatsAppLink = `https://api.whatsapp.com/send?phone=919350937539`

	function generateWhatsAppLink(collegeName) {
		let message = `Hi, I am interested in ${collegeName}, I checked the same on UpSchol. Please help me with the admission process.`
		return `${whatsAppLink}&text=${message}`
	}

	const init = async () => {
		if (!props?.college?.slug) return;
		try {
			setLoading(true);
			let res = await fetch(`../../../../api/collegedetails/${props.college.slug}`);
			res = await res.json();
			if (res.status === 200) {
				setData({
					...res.college,
					whatsAppLink: generateWhatsAppLink(res.college?.college_name)
				});
				setPhotos(res.photos);

			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	function getStars(rating) {
		let arr = [];
		for (let i = 0; i < rating; i++) {
			arr.push(<AiFillStar style={{ color: '#ffc107', marginLeft: 3 }} />)
		}

		for (let i = 0; i < 5 - rating; i++) {
			arr.push(<AiFillStar style={{ color: "#D3D3D3" }} />)
		}
		return arr.slice(0, 5);

	}

	useEffect(() => {
		init();
		if (props.majors) {
			let gridCols = 0;
			if (props.majors?.eligibility?.length > 0) gridCols++;
			if (props.majors?.fees?.annual_fees) gridCols++;
			if (props.majors?.fees?.other_fees?.length > 0) gridCols++;
			setSpecialization({
				...props.majors,
				gridCols
			});
		}
	}, [props]);



	function CollegeCard({ college }) {
		return (
			<div
				className="px-4 lg:px-2 h-[530px] md:h-[540px] mb-5"
			>
				<div
					className="h-full w-full bg-white rounded-xl overflow-hidden flex flex-col" style={{
						borderRadius: '10px',
						background: '#FFFFFFF',
						boxShadow: '0px 0px 14px 0px rgba(0, 0, 0, 0.10)'
					}}
				>
					<div style={{ padding: 10, maxHeight: 300, minHeight: 300 }}>
						<Image
							key={college._id}
							className="h-full w-full object-cover object-center rounded-lg"
							loader={({ src }) => getS3Url(src)}
							src={`${college?.banner_image?.path}`}
							alt={college.college_name}
							width={425}
							height={200}
						/>
						<div
							className="flex flex-col justify-between h-1/5 p-2"
						>
							<div
								className="flex justify-between items-center py-3"
							>
								<Image
									key={college._id}
									className="w-7 min-w-7 min-h-7 h-7 object-contain"
									loader={({ src }) => getS3Url(src)}
									src={`${college?.logo}`}
									alt={college?.college_name}
									width={50}
									height={50}
								/>
								<h5
									className="text-black font-semibold text-base px-3"
								>
									{college.college_name}
								</h5>
								<div
									className="flex gap-x-2 items-center px-3 py-1 rounded bg-[#F4EBFF]"
								>
									<FaStar
										className="text-yellow-500"
									/>

									<p
										className="text-[#6941C6]"
									>
										({college?.rating})
									</p>
								</div>
							</div>
							<div
								className="flex items-center gap-x-4 text-[#00000080] mt-3"
							>
								<FaLocationDot
									size={20}
								/>
								<p
									className="text-[#6941C6]"
								>
									{
										college?.address?.city ? `${college?.address?.city}, ${college?.address?.state}` : college?.address?.state
									}
								</p>
							</div>
							<p
								className="text-[#6941C6] mt-4"
							>
								{college?.description?.substring(0, 60)}....
							</p>
							<div className="flex justify-center">
								<Typography.Link
									className="px-4 mt-3 py-2 w-fit rounded font-normal text-center flex items-center gap-x-2 w-auto"
									style={{
										backgroundColor: "#7F56D9",
										border: "none",
										color: "#fff",
										boxShadow: "none",
									}}
									onClick={() => {
										router.push(`/colleges/${college?.slug}`)
									}}
								>
									View Details
								</Typography.Link>
							</div>
						</div>
					</div>
				</div>
			</div >
		)
	}

	function PrevArrow(props) {
		const { onClick } = props;
		return (
			<div
				className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white p-3"
				onClick={onClick}
			>
				<FaChevronLeft
					size={25}
					color={"black"}
				/>
			</div>
		)
	}

	function NextArrow(props) {
		const { onClick } = props;
		return (
			<div
				className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white p-3"
				onClick={onClick}
			>
				<FaChevronRight
					size={25}
					color={"black"}
				/>
			</div>
		)
	}

	if (loading) {
		return (
			<div className="h-screen w-full flex justify-center items-center">
				<Spin
					size="large"
				/>
			</div>
		);
	}

	return (
		<>
			<div className="bg-background_color w-full py-6">
				<div className="container">
					<div className="hidden md:block container">
						<div className="h-[70vh] 2xl:h-[50vh] flex items-center w-full bg-[#F7F4FF] rounded-xl p-3 relative">
							<div
								className="h-full w-2/4  college-details-container p-2"
							>
								<div className="inner-clipped-shape" />
								<div
									className="flex flex-col h-full"
								>

									<Typography.Title
										level={3}
										className="font-semibold font-Poppins mt-2"
										style={{
											marginBottom: 0
										}}
									>
										{props?.majors?.Major} from {data.college_name}
									</Typography.Title>

									<div
										className="flex items-center gap-x-4 mt-2 mb-2"
									>
										{
											data?.tags?.length > 0 && (
												<Typography.Text
													className="px-6 py-2 rounded font-semibold font-Poppins text-[#6941C6]"
													style={{
														backgroundColor: "#e6d2ff"
													}}
												>
													{
														data?.tags?.length === 1 ? `${data?.tags[0]?.tag_name}` : `${data?.tags[0]?.tag_name} + ${data?.tags?.length - 1} more`
													}
												</Typography.Text>
											)
										}

										<div
											className="flex items-center gap-x-2 justify-center"
										>
											{
												getStars(data?.rating)
											}
										</div>

									</div>

									<p
										className="mt-2"
										style={{
											color: "rgba(0, 0, 0, 0.50)",
										}}
									>
										{data.description?.length > 120
											? `${data.description.substring(0, 120)}...`
											: data.description}
									</p>
									{specialization?.duration || specialization?.fees?.annual_fees ? <div className="mt-auto flex items-center gap-x-6 mb-8">
										{specialization?.duration ? <div>
											<p>
												Duration
											</p>
											<p
												className="mt-2"
												style={{
													color: "rgba(0, 0, 0, 0.50)",
												}}
											>
												{specialization?.duration} Years
											</p>
										</div> : null}
										{specialization?.fees?.annual_fees ? <div>
											<p>
												Course fee
											</p>
											<p
												className="mt-2"
												style={{
													color: "rgba(0, 0, 0, 0.50)",
												}}
											>
												Rs {specialization?.fees?.annual_fees} /-
											</p>
										</div> : null}

									</div> : null}


									<div
										className="mt-auto flex items-center gap-x-6 mb-8"
									>
										<Typography.Link
											className="px-4 mt-2 py-2 w-fit rounded font-normal text-center flex items-center gap-x-2 w-auto"
											style={{
												backgroundColor: "#7F56D9",
												border: "none",
												color: "#fff",
												boxShadow: "none",
											}}
											onClick={() => {
												if (cookies?.user) {
													window.open(specialization?.apply_link, "_blank");
												} else {
													setSelectedURL(specialization?.apply_link);
													setShowLeadModal(true);
												}
											}}
										>
											Enroll Now
											<FaArrowRight />
										</Typography.Link>
									</div>

								</div>
							</div>
							<div
								className="h-full w-2/3 test-div ml-[-16%]">
								<div
									className="banner-img-wrapper h-full w-full relative"
								>
									<Image
										src={
											data?.college_name?.toLowerCase().includes("amity")
											  ? "/amity-university.jpeg"
											  : data?.college_name?.toLowerCase().includes("lovely")
											  ? "/lpu.jpeg"
											  : data?.college_name?.toLowerCase().includes("nmims")
											  ? "/nmims-university.jpeg"
											  // For other colleges, use backend image if available
											  : data?.banner_image?.path
											  ? `https://upschol.s3.ap-south-1.amazonaws.com/${data.banner_image.path}`
											  // Fallback if nothing matches
											  : "/default.jpg"
										  }
										  alt={
											data?.college_name?.toLowerCase().includes("amity")
											  ? "amity mba online fees"
											  : data?.college_name?.toLowerCase().includes("lovely")
											  ? "Lpu Online MBA"
											  : data?.college_name?.toLowerCase().includes("nmims")
											  ? "nmims mba online fees"
											  : data?.banneralt || data?.college_name || "default college image"
										  }
										
										className="banner-img-college-details rounded-tr-xl rounded-br-xl h-full w-full object-cover object-center"
										height={1500}
										width={1500}
									/>
									<div
										className="absolute top-4 right-4 p-2 h-16 w-16 bg-white rounded-xl"
									>
										<Image
											src={data?.logo}
											loader={({ src }) =>
												getS3Url(src)
											}
											alt="College Logo"
											height={256}
											width={256}
											className="h-full w-full rounded-full object-contain"
										/>
									</div>

								</div>
							</div>
						</div>

						<div className="flex justify-center px-3">
							{data?.quick_facts?.length > 0 && (
								<div
									className={`grid grid-cols-2 md:grid-cols-${data?.quick_facts?.length} rounded-xl absolute block w-3/5 md:w-3/4 lg:w-3/5`}
									style={{
										boxShadow: '0px 0px 24px 0px rgba(0, 0, 0, 0.10)',
										zIndex: '0',
										marginTop: '-40px',
										background: 'white',
									}}
								>
									{data?.quick_facts?.map((fact) => (
										<div key={fact?._id} className="bg-gray-100 p-4 rounded-md">
											<Typography.Text
												className="font-semibold font-Poppins block mb-2 text-base"
											>
												{fact?.title}
											</Typography.Text>
											<Typography.Text
												className="text-gray-500 font-Poppins block text-xs"
											>
												{fact?.description?.substring(0, 70)}...
											</Typography.Text>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="md:hidden bg-[#F7F4FF] container">
					<div
						className="banner-img-wrapper h-[40vh] w-full relative"
					>
						<Image
							src={
								data?.college_name?.toLowerCase().includes("amity")
								  ? "/amity-university.jpeg"
								  : data?.college_name?.toLowerCase().includes("lovely")
								  ? "/lpu.jpeg"
								  : data?.college_name?.toLowerCase().includes("nmims")
								  ? "/nmims-university.jpeg"
								  // For other colleges, use backend image if available
								  : data?.banner_image?.path
								  ? `https://upschol.s3.ap-south-1.amazonaws.com/${data.banner_image.path}`
								  // Fallback if nothing matches
								  : "/default.jpg"
							  }
							  alt={
								data?.college_name?.toLowerCase().includes("amity")
								  ? "amity mba online fees"
								  : data?.college_name?.toLowerCase().includes("lovely")
								  ? "Lpu Online MBA"
								  : data?.college_name?.toLowerCase().includes("nmims")
								  ? "nmims mba online fees"
								  : data?.banneralt || data?.college_name || "default college image"
							  }
							className="rounded-xl h-full w-full object-cover object-center"
							height={1500}
							width={1500}
						/>
						<div
							className="absolute top-4 right-4 p-1 h-12 w-12 bg-white rounded-lg"
						>
							<Image
								src={data?.logo}
								loader={({ src }) =>
									getS3Url(src)
								}
								alt="College Logo"
								height={200}
								width={200}
								className="h-full w-full rounded-full object-contain"
							/>
						</div>
					</div>
					<Typography.Title
						level={4}
						className="font-semibold font-Poppins mt-5"
						style={{
							marginBottom: 0
						}}
					>
						{data.college_name}
					</Typography.Title>

					<div className="flex mt-2 mb-2">
						{
							getStars(data?.rating)
						}
					</div>
					<p
						className="mt-3"
						style={{
							color: "rgba(0, 0, 0, 0.50)",
						}}
					>
						{data.description?.length > 120
							? `${data.description.substring(0, 120)}...`
							: data.description}
					</p>

					<Typography.Link
						className="px-8 py-3 rounded-lg font-Poppins font-normal text-center text-base flex items-center gap-x-2 w-[170px] mt-6"
						style={{
							backgroundColor: "#7F56D9",
							border: "none",
							color: "#fff",
							boxShadow: "none",
						}}
						onClick={() => {
							if (cookies?.user) {
								window.open(data.link, "_blank");
								setShowLeadModal(true);
							} else {
								setSelectedURL(data.link);
								setShowLeadModal(true);
							}
						}}
					>
						Enroll Now
						<FaArrowRight />
					</Typography.Link>
					<div className="flex justify-center mt-5">
						{data?.quick_facts?.length > 0 && (
							<div
								className={`grid grid-cols-2 rounded-xl block`}
							>
								{data?.quick_facts?.map((fact) => (
									<div key={fact?._id} className="bg-gray-100 p-4 rounded-md">
										<Typography.Text
											className="font-semibold font-Poppins block mb-2 text-base"
										>
											{fact?.title}
										</Typography.Text>
										<Typography.Text
											className="text-gray-500 font-Poppins block text-xs text-[#00000080]"
										>
											{fact?.description?.substring(0, 70)}...
										</Typography.Text>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="container text-white">
					<div
						className={`${data?.quick_facts?.length > 0 ? "mt-40" : "mt-5"}`}
					>
						<Typography.Title
							level={4}
							style={{
								color: 'white'
							}}
						>
							About College
						</Typography.Title>
						<Typography.Text
							className="text-white"
						>
							{data?.description}
						</Typography.Text>
					</div>
					{
						data?.info_cards && data?.info_cards?.length > 0 && (
							<div
								className="mt-8"
							>
								<Typography.Title
									level={4}
									style={{
										marginTop: '32px',
										color: 'white'
									}}
								>
									Learn, Progress, Outperform
								</Typography.Title>
								<Row
									gutter={[16, 16]}
									align={'stretch'}
									className="mt-8"
								>
									{
										data?.info_cards?.map((card, index) => (
											<Col
												key={card?._id}
												xs={24}
												md={12}
												xl={8}
											>
												<div key={card?._id} className="h-full w-full shadow-md rounded-lg px-4 py-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105" style={{ borderColor: '#e7e7e7', borderWidth: '1px', borderLeftColor: index === 0 ? '#cccccc' : index === 1 ? '#FFE4B9' : index === 2 ? '#F9989C' : '', borderLeftWidth: '6px' }}>
													<Typography.Title
														level={4}
														className="flex-1"
														style={{
															color: 'white'
														}}
													>
														{card?.title}
													</Typography.Title>
													<Typography.Text
														className="flex-1 text-white"
													>
														{card?.desc}
													</Typography.Text>
												</div>
											</Col>
										))
									}
								</Row>
							</div>
						)
					}
					{
						specialization?.eligibility?.length || specialization?.fees?.annual_fees || specialization?.fees?.other_fees?.length || specialization?.specialization?.length ? (
							<div
								className="mt-8 p-4 md:p-10 rounded-[10px]"
								style={{
									background: `linear-gradient(to right bottom, rgb(127, 86, 217) 0%, rgb(67, 46, 115) 80%)`,
								}}
							>
								<Typography.Title
									level={4}
									style={{ color: 'white' }}
								>
									{`Specialization`}
								</Typography.Title>
								<div
									className={`grid my-3 gap-4 grid-cols-1 md:grid-cols-${specialization?.gridCols}`}
								>
									{
										specialization?.eligibility?.length ?
											<div>
												<Typography.Title
													level={5}
													style={{
														color: 'white',
													}}
												>
													{`Eligibility`}
												</Typography.Title>
												<div style={{ padding: '20px', paddingTop: '0px' }}>
													{
														specialization?.eligibility?.map((eligibility, index) => (
															<div
																key={index}
																className="flex justify-between my-3"
															>
																<div>
																	<li
																	>
																		{eligibility}
																	</li>
																</div>
															</div>
														))
													}
												</div>
											</div> : null
									}
									{specialization?.fees?.annual_fees ? <div>
										<Typography.Title
											level={5}
											style={{
												color: 'white',
											}}
										>
											{`Total Fees`}
										</Typography.Title>
										<div style={{ padding: '20px', paddingTop: '0px' }}>
											<div
												className="flex justify-between my-3"
											>
												<div>
													<li
													>
														Rs {specialization?.fees?.annual_fees}/-
													</li>
												</div>
											</div>


										</div>
									</div> : null}
									{specialization?.fees?.other_fees?.length ? <div>
										<Typography.Title
											level={5}
											style={{
												color: 'white',
											}}
										>
											{`Fees Structure`}
										</Typography.Title>
										<div style={{ padding: '20px', paddingTop: '0px' }}>
											{
												specialization?.fees?.other_fees?.map((other_fees, index) => (
													<div
														key={index}
														className="flex justify-between my-3"
													>
														<div>
															<li
															>
																{other_fees?.fee_type} - Rs {other_fees?.amount}
															</li>
														</div>
													</div>
												))
											}
										</div>
									</div> : null}
								</div>
								{specialization?.specialization?.length ? <div>
									<Typography.Title
										level={5}
										style={{
											color: 'white',
										}}
									>
										{`Specialization`}
									</Typography.Title>
									<div style={{ padding: '20px', paddingTop: '0px' }}>
										{
											specialization?.specialization?.map((major, index) => (
												<div
													key={index}
													className="flex justify-between my-3"
												>
													<div>
														<li
														>
															{major?.title}
														</li>
													</div>
													<div>
														<p>
															Rs {major?.fees}/-
														</p>
													</div>

												</div>
											))
										}
									</div>
								</div> : null}

							</div>
						) : null
					}
					{
						data?.facts && data?.facts?.length > 0 && (
							<div
								className="mt-8"
							>
								<Typography.Title
									level={4}
									style={{ color: 'white' }}
								>
									{`${data?.college_name} Facts`}
								</Typography.Title>
								{
									data?.facts?.map((fact, index) => (
										<div
											key={index}
											className="flex items-start gap-x-4 my-5"
										>
											<FaCheckCircle
												color="white"
												className="min-h-5 min-w-5 h-5 w-5"
											/>
											<Typography.Text
												className="text-white"
											>
												{fact}
											</Typography.Text>
										</div>
									))
								}
							</div>
						)
					}
					{
						data?.sample_certificate && (
							<div
								className="mt-8"
							>
								<Typography.Title
									level={4}
									style={{ color: 'white' }}
								>
									{`Sample Certificate from ${data?.college_name}`}
								</Typography.Title>
								<Row
									gutter={[16, 16]}
								>
									<Col
										xs={24}
										md={18}
									>
										<Typography.Text
											className="text-white mb-4 block"
										>
											{data?.sample_certificate?.desc}
										</Typography.Text>
										{
											data?.sample_certificate?.pointers?.map((pointer, index) => (
												<div
													key={index}
													className="flex items-start gap-x-3 my-5"
												>
													<div
														className="rounded-full bg-white flex items-center justify-center p-1.5"
													>
														<SlBadge
															size={14}
															color="#7F56D9"
														/>
													</div>
													<p
														style={{
															color: "white"
														}}
														className="text-base"
													>
														{pointer}
													</p>
												</div>
											))
										}
									</Col>
									<Col
										xs={24}
										md={6}
									>
										<AntdImg
											src={data?.sample_certificate?.image}
											className="rounded-lg w-full object-cover object-center"
											alt={`Sample Certificate from ${data?.college_name}`}
										/>
									</Col>
								</Row>
							</div>
						)
					}
				</div>
			</div >
			{
				data?.approvals && data?.approvals?.length > 0 && (
					<div
						className="p-8 bg-[#121421]"
					>
						<div className="container">
							<Typography.Title
								level={4}
								style={{ color: 'white' }}
							>
								Approvals & Accreditation
							</Typography.Title>
							<Row
								gutter={[16, 16]}
							>
								{data.approvals?.map((approval, index) => (
									<Col key={approval._id} xs={12} sm={8} md={6} lg={4}>
										<Tooltip
											trigger={["hover"]}
											title={
												<p
													className="text-white"
												>
													{approval.name}
												</p>
											}
											color="white"
										>
											<div
												style={{
													border: "1px solid rgba(127, 86, 217, 0.25)",
												}}
												className="h-full flex flex-col items-center justify-between rounded-lg p-4 bg-[#F7F4FF] shadow hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-102"
											>
												<Image
													src={approval.image}
													width={100}
													height={100}
													alt={approval.name}
													className="h-24 w-24 object-contain"
												/>
											</div>
										</Tooltip>
									</Col>
								))}
							</Row>
						</div>
					</div>
				)
			}


			{
				data?.placement_partners && data?.placement_partners?.length > 0 && (
					<div
						className="bg-[#121421] p-8 w-full w-full"
					>
						<div
							className="container w-full"
						>
							<Typography.Text
								className="text-white font-semibold"
							>
								Our Partners
							</Typography.Text>
							<Typography.Title
								level={3}
								className="font-semibold"
								style={{
									marginTop: '6px',
									color: 'white'
								}}
							>
								Placement Partners
							</Typography.Title>
							<Row
								gutter={[16, 16]}
								align={'middle'}
							>
								{data.placement_partners?.map((placement_partner, index) => (
									<Col key={placement_partner._id} xs={12} sm={8} md={6} lg={4}>
										<Tooltip
											trigger={["hover"]}
											title={
												<p
													className="text-black"
												>
													{placement_partner.title}
												</p>
											}
											color="white"
										>
											<div
												style={{
													border: "1px solid rgba(127, 86, 217, 0.25)",
												}}
												className="h-full flex flex-col items-center justify-between rounded-lg p-4 bg-white shadow hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-102"
											>
												<Image
													src={placement_partner.image}
													width={100}
													height={100}
													alt={placement_partner.title}
													className="h-24 w-24 object-contain"
												/>
											</div>
										</Tooltip>
									</Col>
								))}
							</Row>
						</div>
					</div>
				)
			}
			<div
				className="w-full bg-black"
			>
				{
					data?.admission_process && (
						<div
							className="container py-8"
						>
							<Typography.Title
								level={4}
								style={{ color: 'white' }}
							>
								Admission Process
							</Typography.Title>
							<Typography.Text
								className="text-white"
							>
								{data?.admission_process?.desc}
							</Typography.Text>
							<div
								className="mt-4"
							>
								{
									data?.admission_process?.steps?.map((step, index) => (
										<div
											key={index}
											className="flex items-center my-6"
										>
											<Typography.Text
												className="text-base text-white"
											>
												<span
													className="mr-2 font-semibold text-white"
												>
													{`STEP ${index + 1}:`}
												</span>
												{step}
											</Typography.Text>
										</div>
									))
								}
							</div>
						</div>
					)
				}
			</div>
			{
				data?.reviews && data?.reviews?.length > 0 && (
					<div
						className="w-full"
					>
						<div
							className="bg-black w-full pb-4"
						>
							<div
								className="container w-full py-6"
							>
								<Typography.Text
									className="text-[#ebdcf7] font-semibold text-center block"
								>
									Customer Reviews
								</Typography.Text>
								<Typography.Title
									level={3}
									className="text-center"
									style={{
										marginTop: '6px',
										color: 'white'
									}}
								>
									What our Lovely Clients says
								</Typography.Title>
								<Slider
									dots={true}
									speed={500}
									autoplay={true}
									autoPlaySpeed={3000}
									slidesToShow={3}
									slidesToScroll={1}
									infinite={true}
									responsive={[
										{
											breakpoint: 1750,
											settings: {
												slidesToShow: 2,
												slidesToScroll: 1,
											}
										},
										{
											breakpoint: 1200,
											settings: {
												slidesToShow: 1,
												slidesToScroll: 1,
											}
										}
									]}
									className="college-details-reviews-slider"
								>
									{
										data?.reviews?.map((review) => (
											<div
												key={review?._id}
												className="px-4 py-8 h-full"
											>
												<div
													className="h-full bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-between"
												>
													<div
														className="mb-4"
													>
														<Typography.Title
															level={5}
															className="font-semibold"
														>
															{review?.title}
														</Typography.Title>
														<Typography.Text
															className="text-base text-[#00000080]"
														>
															{review?.desc}
														</Typography.Text>
													</div>
													<div
														className="flex gap-x-4"
													>
														<FaRegUserCircle
															size={40}
															color="#7F56D9"
														/>
														<div>
															<Typography.Text
																className="text-base font-semibold block"
															>
																{review?.user}
															</Typography.Text>
															<Typography.Text
																className="text block text-[#00000080]"
															>
																<FaStar
																	size={14}
																	color="rgba(248, 184, 78, 1)"
																	className="inline-block mr-1"
																/>
																{`(${review?.rating} Reviews)`}
															</Typography.Text>
														</div>
													</div>
												</div>
											</div>
										))
									}
								</Slider>
							</div>
						</div>
					</div>
				)
			}
			{
				data?.faqs && data?.faqs?.length > 0 && (
					<div
						className="bg-black w-full"
					>
						<div className="container">
							<Typography.Text
								className="text-[#ebdcf7] font-semibold text-center block"
							>
								Learn More From
							</Typography.Text>
							<Typography.Title
								level={3}
								className="text-center"
								style={{
									marginTop: '6px',
									color: 'white'
								}}
							>
								Frequently Asked Questions
							</Typography.Title>
							<div
								className="flex flex-col items-center justify-center mt-4 gap-y-4 pb-32 px-4 md:px-16 lg:px-32 xl:px-40 2xl:px-48"
							>
								{
									data?.faqs?.map((faq, index) => (
										<div
											key={index}
											className="w-full select-none"
										>
											<div
												className="bg-[#FBF6FF] p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-between cursor-pointer"
												onClick={() => {
													if (selectedFAQ === index) setSelectedFAQ(null)
													else setSelectedFAQ(index)
												}}
											>
												<Typography.Text
													className="text-base font-semibold select-none"
												>
													{`${index + 1}. ${faq?.question}`}
												</Typography.Text>
												{
													selectedFAQ === index ? (
														<MinusOutlined
															size={20}
															color="rgba(0, 0, 0, 0.50)"
														/>
													) : (
														<PlusOutlined
															size={20}
															color="rgba(0, 0, 0, 0.50)"
														/>
													)
												}
											</div>
											{
												selectedFAQ === index && (
													<div
														className="p-4"
													>
														<Typography.Text
															className="text-base select-none text-white"
														>
															{faq?.answer}
														</Typography.Text>
													</div>
												)
											}
										</div>
									))
								}
							</div>
						</div>
					</div>
				)
			}
			{
				props?.similarColleges && props?.similarColleges?.length > 0 && (
					<div
						className="bg-background_color w-full py-6"
					>
						<div className="container">
							<div
								className="flex items-center justify-center"
							>
								<Typography.Title
									level={4}
									style={{ color: 'white' }}
								>
									Suggested Colleges
								</Typography.Title>
							</div>
							<div
								className="mt-8"
							>
								<Slider
									dots={false}
									speed={500}
									autoplay={true}
									autoPlaySpeed={3000}
									slidesToShow={3}
									slidesToScroll={1}
									infinite={true}
									responsive={[
										{
											breakpoint: 1200,
											settings: {
												slidesToShow: 2,
												slidesToScroll: 1,
											}
										},
										{
											breakpoint: 768,
											settings: {
												slidesToShow: 1,
												slidesToScroll: 1,
											}
										}
									]}
									nextArrow={<NextArrow />}
									prevArrow={<PrevArrow />}
								>
									{
										props?.similarColleges?.map((college) => (

											<CollegeCard
												key={college._id}
												college={college}
											/>
										))
									}
								</Slider>
							</div>
						</div>
					</div>
				)
			}
			<LeadModal
				showModal={showLeadModal}
				setShowModal={setShowLeadModal}
				college={data}
				courses={props?.tags}
				navigateToCollege={false}
				onSuccess={() => {
					window.open(selectedURL, "_blank");
					setSelectedURL(null);
				}}
			/>
			<Modal
				open={selectedCourse !== null}
				onCancel={() => {
					setSelectedCourse(null);
				}}
				title={`${selectedCourse?.Major} - Details`}
				footer={null}
				centered
			>
				{
					selectedCourse?.eligibility?.length > 0 && (
						<div>
							<h3
								className="text-xl font-semibold"
							>
								Eligibility
							</h3>
							<ul
								className="list-disc list-inside"
							>
								{
									selectedCourse?.eligibility?.map((eligibility, index) => (
										<li
											key={index}
											className="text-base text-slate-500"
										>
											{eligibility}
										</li>
									))
								}
							</ul>
						</div>
					)
				}
				{
					selectedCourse?.fees?.annual_fees && (
						<div
							className="mt-8"
						>
							<h3
								className="text-xl font-semibold"
							>
								Annual Fees
							</h3>
							<p
								className="text-base text-slate-500"
							>
								Rs {selectedCourse?.fees?.annual_fees} /-
							</p>
						</div>
					)
				}
				{
					selectedCourse?.fees?.other_fees?.length > 0 && (
						<div
							className="mt-8"
						>
							<h3
								className="text-xl font-semibold"
							>
								Other Fees
							</h3>
							<ul
								className="list-disc list-inside"
							>
								{
									selectedCourse?.fees?.other_fees?.map((fee, index) => (
										<li
											key={index}
											className="text-base text-slate-500"
										>
											{`Rs ${fee?.amount} / ${fee?.duration}`}
										</li>
									))
								}
							</ul>
						</div>
					)
				}
				{
					selectedCourse?.specialization?.length > 0 && (
						<div
							className="mt-8"
						>
							<h3
								className="text-xl font-semibold"
							>
								Specializations
							</h3>
							<ul
								className="list-disc list-inside pt-2"
							>
								{
									selectedCourse?.specialization?.map((specialization, index) => (
										<div
											key={index}
											className="flex gap-x-2 justify-between w-full text-base text-slate-500"
										>
											<strong>
												-
											</strong>
											<strong
												className="w-2/3"
											>
												{specialization?.title}
											</strong>
											<span
												className="w-1/3"
											>
												Rs {specialization?.fees} /-
											</span>
										</div>
									))
								}
							</ul>
						</div>
					)
				}
			</Modal>
			<div
				className="fixed bottom-10 right-10 z-50 rounded-full p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
			>
				<FaWhatsapp
					size={40}
					color="#25D366"
					className="cursor-pointer"
					onClick={() => {
						window.open(data?.whatsAppLink, "_blank");
					}}
				/>
			</div>

		</>
	);
}
