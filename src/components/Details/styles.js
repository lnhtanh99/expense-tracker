import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    root: {
        marginBottom: "10px",
        padding: "20px",
    },
    income: {
        borderBottom: "10px solid rgba(0, 255, 0, 0.5)",
    },
    expense: {
        borderBottom: "10px solid rgba(255, 0, 0, 0.5)",
    },
}));