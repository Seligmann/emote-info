import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    appBar: {
        borderRadius: 0,
        margin: '0px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'left',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        marginLeft: '24px',
        textAlign: "right"
    },
    image: {
        marginLeft: '15px',
    },
}));
