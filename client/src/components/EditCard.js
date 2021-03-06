import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
 import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
 import Collapse from '@material-ui/core/Collapse'; 
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red'; 
import  EditField  from './EditField';
import Button from '@material-ui/core/Button';
import MultiLineEditField  from './MultiLineEditField';
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
  state = { 
      expanded: true,
      steps: this.props.recipe.steps,
      ingredients: this.props.recipe.ingredients


    };



  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleFinishedEditing = () => { 
      this.props.handleRecipeEdit(this.state.steps, this.state.ingredients);
      this.props.handleEditButton();
  }

  addIngredient = () => { 

    let ingredients = [...this.state.ingredients];

    let newIngredients = ingredients.filter( v => v !== undefined );
    console.log("add Ingredients called");

    console.log(newIngredients);

    this.setState({ingredients: [...newIngredients, ""]});
  }
  addStep = () => {
    this.setState({steps: [...this.state.steps, ""] });
  }

  handleStepEdit(index, value){
    console.log("handleStepEdit in editcard called"); 
    let newSteps = [...this.state.steps]; 
    newSteps[index] = value;
    console.log(newSteps);
    this.setState({steps: newSteps});
  }

  handleDeleteStep(index){
    let ingredients = [...this.state.steps]; 
    let newSteps = this.state.steps.filter( (value, i) =>  i !== index  ); 
    // this.setState({ingredients: newIngredients});
    // delete(ingredients[index]);
 
    // this.setState({ingredients: ingredients});
    this.props.handleRecipeEdit(newSteps, this.state.ingredients);
    this.props.handleDeleteButton();

  }
  handleIngredientEdit(index, value){
    console.log("handle ingredient in editcard called");
    let newIngredients = [...this.state.ingredients];
    newIngredients[index] = value;
    console.log(newIngredients);
    this.setState({ingredients: newIngredients});

  }

  handleDeleteIngredient(index){
    let ingredients = [...this.state.ingredients]; 
    let newIngredients = this.state.ingredients.filter( (value, i) =>  i !== index  ); 
    // this.setState({ingredients: newIngredients});
    // delete(ingredients[index]);

    console.log(ingredients);
    // this.setState({ingredients: ingredients});
    this.props.handleRecipeEdit(this.state.steps, newIngredients);
    this.props.handleDeleteButton();

    // let newIngredients = [...this.state.ingredients];
    // delete( newIngredients[index]);
    // console.log(newIngredients);
    // this.setState({ingredients: newIngredients});
  }

 
  handleDone(){
   }
  render() {
    const { classes, recipe } = this.props;
    const { steps, ingredients } = this.state;
 
    let foodImage = recipe.image; 
    if (recipe.title === "Oven-Roasted Garlic Chicken"){
      foodImage = require("../images/garlic-chicken-oh.jpg");
    } 
  

    // attempting to replace recipe with state in order to fix bug with adding step/recipe
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader  
            title={"editing"} 
          />
          <CardMedia
            className={classes.media}
            image={foodImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <ul>
            {ingredients.map( (ingredient, index) => {
              if (ingredient===null){
                return {}
              } else 
              return( 
              <EditField ingredient={ingredient} index={index} handleIngredientEdit={(index, value) => this.handleIngredientEdit(index, value)} handleDeleteIngredient={(index) => this.handleDeleteIngredient(index)} />
            ) } ) }
            </ul>

            <Button style={{backgroundColor:"green"}} onClick={this.addIngredient}> Add Ingredient </Button>

            <Typography component="p"> 
            </Typography>
          </CardContent> 
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent> 
              <Typography paragraph variant="body2">
                Method:
              </Typography>

              {steps.map( (step, index) => { 
                return(
                  <Typography paragraph>
                    <MultiLineEditField step={step} index={index} handleStepEdit={(index,value) => this.handleStepEdit(index, value)}  handleDeleteStep={ (index) => this.handleDeleteStep(index) } />
                  </Typography>

                );
               } )}

               <Button style={{backgroundColor:"green"}} onClick={this.addStep}> Add Step </Button> 

            </CardContent>

              <Button variant="text" style={{backgroundColor:"red"}} onClick={this.handleFinishedEditing}>Done</Button>
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