import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
 import RecipeCardMenu from "./RecipeCardMenu";
const styles = theme => ({
  card: {
    maxWidth: 400,
    width: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false 
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  setImag = (url) => { 
    this.props.handleUploadPhoto(String(url));    
  }
  render() {
    const { classes, recipe } = this.props;
    let foodImage = recipe.image; 
    if (recipe.title === "Oven-Roasted Garlic Chicken"){
      foodImage = require("../images/garlic-chicken-oh.jpg");
    }  
    console.log(foodImage);
 
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <RecipeCardMenu handleDelete={() => this.props.handleDelete() } handleEditButton={() => this.props.handleEditButton()} setImag={ url => this.setImag(url)}  />
            }
            title={recipe.title}
            // subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={String(foodImage)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <ul>
            {recipe.ingredients.map( ingredient => {return( 
              <li key={ingredient} >{ingredient} </li>
            ) } ) }
            </ul>
            <Typography component="p"> 
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Method:
              </Typography>

              {recipe.steps.map( (step, index) => { 
                return(
                  <Typography key={index} paragraph>
                    {step}
                  </Typography>

                );
               } )} 
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(RecipeReviewCard);