// import React, { useEffect } from 'react';
// import "./faq_fuelfree.css";

// const Faq_fuelfree = () => {
//   useEffect(() => {
//     // Move your JavaScript code for handling accordions here
//     const acc = document.querySelectorAll(".accordion");

//     acc.forEach((button) => {
//       button.addEventListener("click", function() {
//         this.classList.toggle("active");
//         const panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//           panel.style.maxHeight = null;
//         } else {
//           panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//       });
//     });
//   }, []); // Empty dependency array to run this code once on component mount

//   return (
//     <div>
//       <section id="accordian-faq">
//         <div className="tanker">
//           <div className="accordian-faq-outer">
//             <div className="accordian-faq-left">
//               <h2>FAQ<span>s</span></h2>
//               <p>Frequently asked questions </p>
//             </div>
//             <div className="accordian-faq-right">
              
//               <button className="accordion"><span>1</span>What are the benefits of using FuelFree's clean energy solutions?</button>
//               <div className="panel">
//                 <p>
//                 FuelFree's clean energy solutions offer several key benefits. First and foremost, they are environmentally friendly and reduce greenhouse gas emissions, helping combat climate change. Additionally, our clean energy options are cost-effective, often leading to lower energy bills for our customers. They also provide energy independence and reliability, as they are not subject to fluctuations in fossil fuel prices. Furthermore, by choosing FuelFree, you support the transition to a more sustainable energy future.</p>
//               </div>

//               <button className="accordion"><span>2</span>How can I switch to FuelFree's clean energy services for my home or business?</button>
//               <div className="panel">
//                 <p>Switching to FuelFree's clean energy services is a simple process. Start by contacting our customer service team or visiting our website to explore the available options and plans. You can then sign up for the plan that best suits your needs. Our team will guide you through the transition process, including any necessary equipment installation, and ensure a smooth switch to clean energy. We prioritize customer satisfaction and are committed to making the transition as seamless as possible.</p>
//               </div>

//               <button className="accordion"><span>3</span>Are there any government incentives or rebates for using FuelFree's clean energy solutions?</button>
//               <div className="panel">
//                 <p>Yes, there are often government incentives and rebates available for using FuelFree's clean energy solutions. These incentives vary by location and can include tax credits, rebates, and other financial incentives offered by federal, state, or local governments. FuelFree is committed to helping customers take full advantage of these opportunities. We provide information and assistance in accessing available incentives to make clean energy even more affordable. Be sure to check with our team or consult your local government's energy programs to see what incentives you may qualify for when switching to FuelFree's clean energy solutions.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Faq_fuelfree;


import React, { useState } from 'react';
import "./faq_fuelfree.css";
// import './Accordion.css'; // You can create a CSS file for styling

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex;
    const icon = isActive ? '▼' : '▶';

    return (
      <div className={`accordion ${isActive ? 'active' : ''}`} key={index}>
        <button className="accordion" onClick={() => onTitleClick(index)}>
          <span>{icon}</span>
          {item.title}
        </button>
        <div className={`panel ${isActive ? 'active' : ''}`}>
          {item.content}
        </div>
      </div>
    );
  });

  return <div className="accordian-faq-right">{renderedItems}</div>;
};

const items = [
  {
    title: 'What are the benefits of using FuelFree clean energy solutions?',
    content: ' FuelFrees clean energy solutions offer several key benefits. First and foremost, they are environmentally friendly and reduce greenhouse gas emissions, helping combat climate change. Additionally, our clean energy options are cost-effective, often leading to lower energy bills for our customers. They also provide energy independence and reliability, as they are not subject to fluctuations in fossil fuel prices. Furthermore, by choosing FuelFree, you support the transition to a more sustainable energy future.',
  },
  {
    title: 'How can I switch to FuelFree clean energy services for my home or business?',
    content: 'Switching to FuelFree clean energy services is a simple process. Start by contacting our customer service team or visiting our website to explore the available options and plans. You can then sign up for the plan that best suits your needs. Our team will guide you through the transition process, including any necessary equipment installation, and ensure a smooth switch to clean energy. We prioritize customer satisfaction and are committed to making the transition as seamless as possible.',
  },
  {
    title: 'Are there any government incentives or rebates for using FuelFrees clean energy solutions?',
    content: 'Yes, there are often government incentives and rebates available for using FuelFrees clean energy solutions. These incentives vary by location and can include tax credits, rebates, and other financial incentives offered by federal, state, or local governments. FuelFree is committed to helping customers take full advantage of these opportunities. We provide information and assistance in accessing available incentives to make clean energy even more affordable. Be sure to check with our team or consult your local governments energy programs to see what incentives you may qualify for when switching to FuelFrees clean energy solutions.',
  },
];

const Faq_fuelfree = () => {
  return (
    <div>
    <section id="accordian-faq">
        <div className="tanker">
        <div className="accordian-faq-outer">
        <div className="accordian-faq-left">
              <h2>FAQ<span>s</span></h2>
               <p>Frequently asked questions </p>
     </div>
      <Accordion items={items} />
    </div>
    </div>
    </section>
    </div>

  );
};

export default Faq_fuelfree;
