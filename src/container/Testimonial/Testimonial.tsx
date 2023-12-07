import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client, urlFor } from "../../client";
import { Brand, Testimonial } from "../../lib/types";
import "./Testimonial.scss";

const Testimonials: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  const testIdx = testimonials[currentIndex];

  useEffect(() => {
    const query = `
    *[_type == "testimonials"] {
      _id,
        name,
        company,
        feedback,
        imgUrl,
    }`;
    const brandsQuery = `
    *[_type == "brands"] {
      name,
        _id,
        "imageUrl": imgUrl.asset->url
    }`;

    const getBrands = async () => {
      const data: Brand[] = await client.fetch(brandsQuery);
      setBrands(data);
    };

    getBrands();

    const getTestimonials = async () => {
      const data: Testimonial[] = await client.fetch(query);
      setTestimonials(data);
    };

    getTestimonials();
  }, []);

  return (
    <>
      <h2 className="head-text">
        What my clients <span>are saying</span>
      </h2>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(testIdx.imgUrl).url()} alt={testIdx.name} />
            <div className="app__testimonial-content">
              <p className="p-text">{testIdx.feedback}</p>
              <div>
                <h4 className="bold-text">{testIdx.name}</h4>
                <h5 className="p-text">{testIdx.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={brand.imageUrl} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

const TestimonialsContainer = AppWrap(
  MotionWrap(Testimonials, "app__testimonial"),
  "testimonials",
  "app__primarybg"
);

export default TestimonialsContainer;
