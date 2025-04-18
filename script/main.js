function createHearts() {
    const container = document.getElementById('hearts-container');
    const colors = ['#ff6b88', '#ff8e9e', '#ffb3c1', '#ffd6e0', '#f9c5d5'];
    
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = Math.random() * 100 + 'vh';
      heart.style.width = (Math.random() * 20 + 10) + 'px';
      heart.style.height = heart.style.width;
      heart.style.animationDelay = Math.random() * 5 + 's';
      heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
      heart.style.opacity = Math.random() * 0.5 + 0.3;
      container.appendChild(heart);
    }
  }
  
  function addSparkleEffect() {
    document.addEventListener('mousemove', function(e) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = e.pageX + 'px';
      sparkle.style.top = e.pageY + 'px';
      
      const size = Math.random() * 10 + 5;
      sparkle.style.width = size + 'px';
      sparkle.style.height = size + 'px';
      
      const color = `hsl(${Math.random() * 60 + 330}, 100%, ${Math.random() * 30 + 60}%)`;
      sparkle.style.backgroundColor = color;
      
      document.body.appendChild(sparkle);
      
      gsap.to(sparkle, {
        x: '+=20',
        y: '+=20',
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out'
      });
      
      gsap.to(sparkle, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        delay: 0.3,
        onComplete: () => sparkle.remove()
      });
    });
  }
  
  // Create confetti explosion
  function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.width = (Math.random() * 10 + 5) + 'px';
      confetti.style.height = (Math.random() * 5 + 3) + 'px';
      
      document.body.appendChild(confetti);
      
      const animationDuration = Math.random() * 3 + 2;
      
      gsap.to(confetti, {
        top: '100vh',
        left: `+=${(Math.random() - 0.5) * 100}`,
        opacity: 1,
        duration: animationDuration,
        ease: 'power1.out',
        onComplete: () => confetti.remove()
      });
      
      gsap.to(confetti, {
        opacity: 0,
        duration: 0.5,
        delay: animationDuration - 0.5
      });
    }
  }
  
  // trigger to play music in the background with sweetalert
  window.addEventListener('load', () => {
      createHearts();
      addSparkleEffect();
      
      Swal.fire({
          title: 'Ready for Mouna\'s birthday surprise? 🎂',
          text: 'Do you want to play music in the background?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#ff6b88',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes please!',
          cancelButtonText: 'No thanks',
          background: '#fff5f5',
          backdrop: `
            rgba(255,214,224,0.4)
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><text x='20' y='50' font-size='30'>🎈</text><text x='70' y='30' font-size='20'>🎂</text></svg>")
            center top
            no-repeat
          `
      }).then((result) => {
          if (result.isConfirmed) {
              document.querySelector('.song').play();
              createConfetti();
              animationTimeline();
          } else {
              createConfetti();
              animationTimeline();
          }
      });
  });
  
  
  // animation timeline
  const animationTimeline = () => {
      // split chars that needs to be animated individually
      const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
      const hbd = document.getElementsByClassName("wish-hbd")[0];
  
      textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
          .split("")
          .join("</span><span>")}</span>`;
  
      hbd.innerHTML = `<span>${hbd.innerHTML
          .split("")
          .join("</span><span>")}</span>`;
  
      const ideaTextTrans = {
          opacity: 0,
          y: -20,
          rotationX: 5,
          skewX: "15deg"
      }
  
      const ideaTextTransLeave = {
          opacity: 0,
          y: 20,
          rotationY: 5,
          skewX: "-15deg"
      }
  
      // timeline
      const tl = new TimelineMax();
  
      tl.to(".container", 0.6, {
          visibility: "visible"
      })
      .from(".one", 0.7, {
          opacity: 0,
          y: 10
      })
      .from(".two", 0.4, {
          opacity: 0,
          y: 10
      })
      .to(".one",
          0.7,
          {
              opacity: 0,
              y: 10
          },
      "+=3.5")
      .to(".two",
          0.7,
          {
              opacity: 0,
              y: 10
          },
      "-=1")
      .from(".three", 0.7, {
          opacity: 0,
          y: 10
      })
      .to(".three",
          0.7,
          {
              opacity: 0,
              y: 10
          },
      "+=3")
      .from(".four", 0.7, {
          scale: 0.2,
          opacity: 0,
      })
      .from(".fake-btn", 0.3, {
          scale: 0.2,
          opacity: 0,
      })
      .staggerTo(
          ".hbd-chatbox span",
          1.5, {
              visibility: "visible",
          },
          0.05
      )
      .to(".fake-btn", 0.1, {
          backgroundColor: "#ff6b88",
      },
      "+=4")
      .to(
          ".four",
          0.5, {
              scale: 0.2,
              opacity: 0,
              y: -150
          },
      "+=1")
      .from(".idea-1", 0.7, ideaTextTrans)
      .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-2", 0.7, ideaTextTrans)
      .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-3", 0.7, ideaTextTrans)
      .to(".idea-3 strong", 0.5, {
          scale: 1.2,
          x: 10,
          backgroundColor: "#ff6b88",
          color: "#fff",
      })
      .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-4", 0.7, ideaTextTrans)
      .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
      .from(
          ".idea-5",
          0.7, {
              rotationX: 15,
              rotationZ: -10,
              skewY: "-5deg",
              y: 50,
              z: 10,
              opacity: 0,
          },
          "+=1.5"
      )
      .to(
          ".idea-5 span",
          0.7, {
              rotation: 90,
              x: 8,
          },
          "+=1.4"
      )
      .to(
          ".idea-5",
          0.7, {
              scale: 0.2,
              opacity: 0,
          },
          "+=2"
      )
      .staggerFrom(
          ".idea-6 span",
          0.8, {
              scale: 3,
              opacity: 0,
              rotation: 15,
              ease: Expo.easeOut,
          },
          0.2
      )
      .staggerTo(
          ".idea-6 span",
          0.8, {
              scale: 3,
              opacity: 0,
              rotation: -15,
              ease: Expo.easeOut,
          },
          0.2,
          "+=1.5"
      )
      .staggerFromTo(
          ".baloons img",
          2.5, {
              opacity: 0.9,
              y: 1400,
          }, {
              opacity: 1,
              y: -1000,
          },
          0.2
      )
      .from(
          ".profile-picture",
          0.5, {
              scale: 3.5,
              opacity: 0,
              x: 25,
              y: -25,
              rotationZ: -45,
          },
          "-=2"
      )
      .from(".hat", 0.5, {
          x: -100,
          y: 350,
          rotation: -180,
          opacity: 0,
      })
      .staggerFrom(
          ".wish-hbd span",
          0.7, {
              opacity: 0,
              y: -50,
              rotation: 150,
              skewX: "30deg",
              ease: Elastic.easeOut.config(1, 0.5),
          },
          0.1
      )
      .staggerFromTo(
          ".wish-hbd span",
          0.7, {
              scale: 1.4,
              rotationY: 150,
          }, {
              scale: 1,
              rotationY: 0,
              color: "#ff6b88",
              ease: Expo.easeOut,
          },
          0.1,
          "party"
      )
      .from(
          ".wish h5",
          0.5, {
              opacity: 0,
              y: 10,
              skewX: "-15deg",
          },
          "party"
      )
      .staggerTo(
          ".eight svg",
          1.5, {
              visibility: "visible",
              opacity: 0,
              scale: 80,
              repeat: 3,
              repeatDelay: 1.4,
          },
          0.3
      )
      .to(".six", 0.5, {
          opacity: 0,
          y: 30,
          zIndex: "-1",
      })
      .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
      .to(
          ".last-smile",
          0.5, {
              rotation: 90,
          },
          "+=1"
      )
      .call(createConfetti); // Add confetti at the end
  
      // Restart Animation on click
      const replyBtn = document.getElementById("replay");
      replyBtn.addEventListener("click", () => {
          tl.restart();
          createConfetti();
      });
  }