import FeatureOverview from "../components/landing_page/FeatureOverview";
import Partners from "../components/landing_page/ourPartners";
import GetinTouch from "../components/landing_page/GetinTouch";
import WhyUpschol from "../components/landing_page/whyUpschol";
import RightGuidance from "../components/landing_page/RightGuidance";
import SucessStories from "../components/landing_page/SucessStories";
import FAQ from "../components/landing_page/faq";
import Courses from "../components/landing_page/Courses";
import Head from "next/head";
import { TagCategories } from "../config";
import Tag from "../model/tags";
import dbConnect from "../dbConnect";
import { useEffect, useState } from "react";
import Banner from "../components/landing_page/Banner";
import InternationCollaborators from "../components/landing_page/InternationalCollaborators";
import blogModel from "../model/blogModel";
import BlogSection from "../components/landing_page/BlogSection";
import Scholarship from "../components/landing_page/Scholarship";
import HorizontallyScrollingSteps from "../components/landing_page/HorizontalScrollingSteps";
import collegeModel from "../model/collegeModel";
import MajorModel from "../model/major";

export async function getServerSideProps() {
  await dbConnect();

  // Optimized: fetch all tags in parallel
  const tagsByCategory = await Promise.all(
    TagCategories.map(category => Tag.find({ tag_category: category }))
  );

  // Optimized: fetch collegeCount and college[] in parallel
  async function countColleges(tags) {
    const enrichedTags = await Promise.all(tags.map(async (tag) => {
      const [count, college] = await Promise.all([
        collegeModel.countDocuments({ tags: tag._id, hidecollege: true }),
        collegeModel.find({ tags: tag._id }).populate("banner_image").exec()
      ]);
      return { ...tag._doc, collegeCount: count, college };
    }));
    return enrichedTags;
  }

  const enrichedTagsByCategory = await Promise.all(tagsByCategory.map(countColleges));

  const tagsObj = {};
  TagCategories.forEach((category, i) => {
    tagsObj[category] = enrichedTagsByCategory[i];
  });

  // Fetch other data in parallel
  const [colleges, blogs, major] = await Promise.all([
    collegeModel.find({}).limit(50),
    blogModel.find({}).limit(3),
    MajorModel.find({})
  ]);

  return {
    props: {
      tags: JSON.parse(JSON.stringify(tagsObj)),
      blogs: JSON.parse(JSON.stringify(blogs)),
      major: JSON.parse(JSON.stringify(major)),
      college: JSON.parse(JSON.stringify(colleges)),
    },
  };
}

export default function Page1(props) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 786);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Apply to Top Online Universities in India | Upschol</title>
        <meta name="description" content="Earn a UGC-approved online MBA, BBA, BCom, MCA, or any degree from top online universities in India. Flexible, affordable, and recognized. Apply Now!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <div id="landingContainer" className="scroll-smooth bg-background_color">
        <Banner pg_course={props?.tags['PG COURSE']} ug_course={props?.tags['UG COURSE']} />
        <FeatureOverview />
        <Courses categories={TagCategories} tags={props?.tags} isMobile={isMobile} />
        <WhyUpschol />
        <SucessStories />
        <HorizontallyScrollingSteps />
        <Scholarship categories={TagCategories} tags={props?.tags} landdingPage={true} />
        <Partners college={props?.college} />
        <InternationCollaborators />
        <RightGuidance />
        <FAQ />
        <BlogSection blogs={props?.blogs} />
        <GetinTouch />
      </div>
    </>
  );
}
