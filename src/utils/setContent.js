import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/errorMessage";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data) => {
    switch (process) {
      case 'loading':
        return <Spinner />;
      case 'waiting':
        return <Skeleton />;
      case 'error':
        return <ErrorMessage />;
      case 'confirmed':
        return <Component data={data} />;
      default:
        throw new Error('Unexpected process value');
    }
  
  };

  export default setContent;