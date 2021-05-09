import "../../assets/App.css";
import React from "react";
import Particles from "react-particles-js";

export const BackGroungParticles = () => {
  return (
    <>
      <Particles
        params={{
          particles: {
            number: {
              value: 120,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            line_linked: {
              enable: true,
              // opacity: 0.02,
              opacity: 0.12,
            },
            move: {
              direction: "right",
              // speed: 0.05,
              speed: 0.95,
            },
            size: {
              value: 20,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          // interactivity: {
          //   events: {
          //     onclick: {
          //       enable: true,
          //       mode: "push",
          //     },
          //   },
          //   modes: {
          //     push: {
          //       particles_nb: 1,
          //     },
          //   },
          // },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
          retina_detect: true,
        }}
      />
      {/* <Particles
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      /> */}
    </>
  );
};
