import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const ScrollSections = () => {
  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const scroller = new LocomotiveScroll({
      el: document.querySelector('.container'),
      smooth: true,
    });

    // Update ScrollTrigger on scroll
    scroller.on('scroll', ScrollTrigger.update);

    // Set up ScrollTrigger proxy with Locomotive Scroll
    ScrollTrigger.scrollerProxy('.container', {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Set up color change on scroll
    const scrollColorElems = document.querySelectorAll('[data-bgcolor]');
    scrollColorElems.forEach((colorSection, i) => {
      const prevBg = i === 0 ? '' : scrollColorElems[i - 1].dataset.bgcolor;
      const prevText = i === 0 ? '' : scrollColorElems[i - 1].dataset.textcolor;

      ScrollTrigger.create({
        trigger: colorSection,
        scroller: '.container',
        start: 'top 50%',
        onEnter: () =>
          gsap.to('body', {
            backgroundColor: colorSection.dataset.bgcolor,
            color: colorSection.dataset.textcolor,
            overwrite: 'auto',
          }),
        onLeaveBack: () =>
          gsap.to('body', {
            backgroundColor: prevBg,
            color: prevText,
            overwrite: 'auto',
          }),
      });
    });

    ScrollTrigger.addEventListener('refresh', () => scroller.update());
    ScrollTrigger.refresh();

    return () => {
      scroller.destroy();
      ScrollTrigger.removeEventListener('refresh', () => scroller.update());
    };
  }, []);

  return (
    <div className="container">
      <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
        <h1 data-scroll data-scroll-speed="3">Change background color with GSAP ScrollTrigger</h1>
        <img src="https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Nature" />
      </section>
      <section data-bgcolor="#eacbd1" data-textcolor="#536fae">
        <img src="https://images.pexels.com/photos/4467879/pexels-photo-4467879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Urban" />
        <h2 data-scroll data-scroll-speed="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
      </section>
      <section data-bgcolor="#536fae" data-textcolor="#eacbd1">
        <img src="https://images.pexels.com/photos/5604966/pexels-photo-5604966.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Landscape" />
        <h2 data-scroll data-scroll-speed="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
      </section>
      <section data-bgcolor="#e3857a" data-textcolor="#f1dba7">
        <img src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Forest" />
        <h2 data-scroll data-scroll-speed="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
      </section>
    </div>
  );
};

export default ScrollSections;
