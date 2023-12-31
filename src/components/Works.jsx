import Tilt from "react-parallax-tilt";
import { useState, useEffect } from "react";
import { animate, motion } from "framer-motion";
import { styles } from "../styles";
import { github, googlecolab } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, machine_learning_projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  const [isMobile, setIsMobile] = useState(false);
  let imageType = "";

  switch (name) {
    case "Diamond Price Prediction":
      imageType = googlecolab;
      break;
    case "User Activity Recognition":
      imageType = googlecolab;
      break;
    default:
      imageType = github;
      break;
  }

  useEffect(() => {
    // Add a listener for changes to screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value to the useState variable
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }
  }, [])


  return (
    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => ({ scale: 0.95 })} variants={fadeIn("up", "spring", index * 0.5, 0.75)} className="cursor-pointer" href={`/${name}`}>
      <Tilt 
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        tiltEnable={isMobile ? false : true}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          /> 
          <div className="absolute inset-0 justify-end m-3 flex card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img 
                src={imageType}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.a>
  )
}

const WorksPage = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          The gallery of projects shown below is a showcase of my passion and love for programming, 
          some of which are passion projects, while some may be from hackathons, all of 
          which are targeted towards solving problems with different technologies.
        </motion.p>
      </div>
      <motion.p className="mt-10 text-3xl font-semibold text-secondary" variants={fadeIn("left", "spring", 0.4, 0.75)}>Software Engineering</motion.p>
      <div className="mt-6 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} index={index} />
        ))}
      </div>
      <motion.p className="mt-10 text-3xl font-semibold text-secondary" variants={fadeIn("left", "spring", 0.8, 0.75)}>Machine Learning</motion.p>
      <div className="mt-6 flex flex-wrap gap-7">
        {machine_learning_projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} index={index} />
        ))}
      </div>
    </>
  )
}

const Works = SectionWrapper(WorksPage, "project");

export default Works;