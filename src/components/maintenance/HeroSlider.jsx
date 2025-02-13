import logo_snc from '../../img/logo_snc.jpg';
import logo_snc2 from '../../img/logo_snc2.jpg';

const HeroSlider = ({darkMode}) => {
  // แยก animation ออกจาก opacity
  const animationKeyframes = `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: scale(3);
      }
      to {
        transform: scale(1);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
    }
  `;

  const slidesConfig = [
    {
      image: logo_snc,
      title: "CNS PATTAYA",
      subtitle: "บริการซ่อมบำรุงครบวงจร",
      engSubtitle: "Complete Maintenance Services",
    },
    {
      image: logo_snc2,
      title: "CNS RAYONG",
      subtitle: "ทีมงานมืออาชีพ",
      engSubtitle: "Expert Maintenance Staff",
    },
  ];

  return (
    <div id="carouselExampleCaptions" className="carousel slide rounded" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {slidesConfig.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {slidesConfig.map((slide, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img 
              src={slide.image} 
              className={`d-block w-100 ${index === 0 ? 'animate-fade-in-down' : 'animate-fade-in-up'}`}
              alt={slide.title}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                opacity: darkMode ? 0.5 : 1  // ควบคุม opacity ด้วย style โดยตรง
              }}
            />
            <div 
              className="carousel-caption"
              style={{
                backdropFilter: "blur(3px)",
                borderRadius: "15px",
              }}
            >
              <h5 className='fs-1' style={{color:  "white" }}>
                {slide.title}
              </h5>
              <p className='fs-3' style={{color:  "white" }}>
                {slide.subtitle}
              </p>
              <p className='fs-3' style={{color:  "white" }}>
                {slide.engSubtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="carousel-control-prev" 
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span 
          className="carousel-control-prev-icon" 
          aria-hidden="true" 
          style={{
            width:'3rem',
            height:'3rem',
            color: darkMode ? "white" : "#3C3D37"
          }}
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button 
        className="carousel-control-next" 
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span 
          className="carousel-control-next-icon" 
          aria-hidden="true" 
          style={{width:'3rem',height:'3rem'}}
        ></span>
        <span className="visually-hidden">Next</span>
      </button>

      <style>{`
        img {
          height: 85vh;
        }

        @media only screen and (max-width: 768px) {
          img {
            height: 50vh;
            object-fit: contain;
          }
        }

        ${animationKeyframes}

        .animate-fade-in-down {
          animation-name: fadeInDown;
          animation-duration: 1s;
          animation-fill-mode: forwards;
        }

        .animate-fade-in-up {
          animation-name: fadeInUp;
          animation-duration: 1s;
          animation-fill-mode: forwards;
        }

        .carousel-inner {
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
