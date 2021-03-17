import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../PostDetail/PostDetail.css'

const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
    // bullet: {
    //     // display: 'inline-block',
    //     // margin: '0 2px',
    //     // transform: 'scale(0.8)',
    // },
    title: {
        fontSize: 14,
    },
    pos: {
        // marginBottom: 12,
    },
});



const PostDetail = (props) => {
    const { title, body } = props.posts;
    // console.log(posts)

    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;


    return (        
       <div>
            <Card style={{ width:'100%', display: 'inline-flex', justifyContent: 'space-between' }} className='cardStyle' className={classes.root}>
        <CardContent className='postDetail'>
            <Typography className={classes.title} color="textSecondary">
                {title}
            </Typography>
            <br/>
            <Typography variant="body2" component="p">
                {body}
                <br />
                {'"a benevolent smile"'}
            </Typography>
            <CardActions>
                <Button size="small" style={{backgroundColor: 'lightblue'}}>Learn More more</Button>
            </CardActions>
        </CardContent>
    </Card>
       </div>        
    );
};

export default PostDetail;