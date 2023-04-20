import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import {
  fetchTopics,
  capitalizeFirstLetter,
  formatTopicArr,
} from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import Topics from "../../interfaces/Topics";
import ITopic from "../../interfaces/ITopic";
import "swiper/css";
import "./TopicSelect.css";

const TopicSelect = () => {
  const { topic } = useParams<{ topic: Topics }>();
  const navigate = useNavigate();
  const [topicListApi, setTopicListApi] = useState<ITopic[]>([]);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleNavigate = (topic: Topics) => {
    navigate(`/topics/${topic}`);
  };

  useEffect(() => {
    fetchTopics().then((res) => {
      const topicsArr = res.topics;
      setTopicListApi(() => formatTopicArr(topicsArr, topic));
    });
  }, [topic]);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="topicSelect">
      <div className="topicHeadings">
        <h2 className="topicsTitle">Topics</h2>
        <div className="swipeText">
          <p>Swipe</p>
          <FaArrowCircleRight className="readArrow" />
        </div>
      </div>

      <Swiper
        className="topicSwiper"
        spaceBetween={50}
        slidesPerView={dimensions.width > 1200 ? 3 : 2}
      >
        {topicListApi.map((mapTopic) => {
          return (
            <SwiperSlide key={mapTopic.slug}>
              <h2
                className={`topicSlide noselect ${
                  mapTopic.slug === topic ? "activeTopic" : ""
                }`}
                onClick={() => {
                  handleNavigate(mapTopic.slug);
                }}
              >
                {mapTopic.slug && capitalizeFirstLetter(mapTopic.slug)}
              </h2>
            </SwiperSlide>
          );
        })}
        <SwiperSlide
          className={`topicSlide noselect ${
            topic === "allTopics" ? "activeTopic" : ""
          }`}
          onClick={() => {
            navigate("/topics/allTopics");
          }}
        >
          View All
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default TopicSelect;
