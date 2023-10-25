const config = {
    screens: {
      Home: {
        path: "home",
      },
    },
  };
  
  const linking = {
    prefixes: ["demoapp://app"],
    config,
  };
  
  export default linking;

  //npx uri-scheme open "demoapp://app/home"