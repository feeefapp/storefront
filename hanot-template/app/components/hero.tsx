import React from "react";

type Props = {
  // Prop types go here
  title: string;
  subtitle: string;
};

function Hero({}: Props) {
  return (
    <div>
      <h1>Hero</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}

export default Hero;
