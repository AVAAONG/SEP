'use client';

const getGreeting = () => {
  // Get the current hour from the user's browser
  const currentHour = new Date().getHours();

  // Determine the greeting based on the hour
  if (currentHour >= 6 && currentHour < 12) {
    return 'Buenos días';
  } else if (currentHour >= 12 && currentHour < 19) {
    return 'Buenas tardes';
  } else {
    return 'Buenas noches';
  }
};

const Greeting = ({ name }: { name: string }) => {
  return (
    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
      {`${getGreeting()}, ${name} 💚`}
    </h1>
  );
};

export default Greeting;
