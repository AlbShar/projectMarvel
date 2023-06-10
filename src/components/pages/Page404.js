import {Link} from "react-router-dom";
import ErrorMessage from "../errorMessage/errorMessage";

const Page404 = () => {
    return (
        <>
            <ErrorMessage/>
            <p style={{'textAlign': "center", "fontWeight": "bold", "fontSize": 24}}>Page doesn't exist</p>
            <Link style={{"display": "block", 'marginTop': 34, 'textAlign': "center", "fontWeight": "bold", "fontSize": 24}} to="/">Back to main page</Link>
        </>
    )
};

export default Page404;