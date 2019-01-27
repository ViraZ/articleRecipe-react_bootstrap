import React, { Component } from 'react';
import ListArticles from './ListRecipes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';

class AddRecipe extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getValidationStateTitle = this.getValidationStateTitle.bind(this);
    this.getValidationStateIngredients = this.getValidationStateIngredients.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.addRecipeButModal = this.addRecipeButModal.bind(this);
    this.openCardForEdit = this.openCardForEdit.bind(this);

    this.state = {
      index: 0,
      show: false,
      title: '',
      ingredients: '',
      modalHeader: "New Article",
      addButHeader: "Submit",
      recipes: JSON.parse(localStorage.getItem("_article_recipes"))
    };
  }

  componentWillMount() {
    if (localStorage.getItem("_article_recipes") === null) {
      localStorage.setItem(
        "_article_recipes",
        JSON.stringify([
          {
            title: "Pizza Margherita in 4 easy steps",
            ingredients: "Make the base: Put the flour into a large bowl, then stir in the yeast and salt. Make a well, pour in 200ml warm water and the olive oil and bring together with a wooden spoon until you have a soft, fairly wet dough. Turn onto a lightly floured surface and knead for 5 mins until smooth. Cover with a tea towel and set aside. You can leave the dough to rise if you like, but it’s not essential for a thin crust"
          },
            {
                title: "Pizza Margherita in 4 easy steps",
                ingredients: "Make the base: Put the flour into a large bowl, then stir in the yeast and salt. Make a well, pour in 200ml warm water and the olive oil and bring together with a wooden spoon until you have a soft, fairly wet dough. Turn onto a lightly floured surface and knead for 5 mins until smooth. Cover with a tea towel and set aside. You can leave the dough to rise if you like, but it’s not essential for a thin crust"
            },
            {
                title: "Pizza Margherita in 4 easy steps",
                ingredients: "Make the base: Put the flour into a large bowl, then stir in the yeast and salt. Make a well, pour in 200ml warm water and the olive oil and bring together with a wooden spoon until you have a soft, fairly wet dough. Turn onto a lightly floured surface and knead for 5 mins until smooth. Cover with a tea towel and set aside. You can leave the dough to rise if you like, but it’s not essential for a thin crust"
            },
        ])
      );
      this.setState({
        recipes: JSON.parse(localStorage.getItem("_article_recipes"))
      });
    }
  }

  getValidationStateTitle() {
    const titleLength = this.state.title.length;
    if (titleLength >= 1) return 'success';
    else if (titleLength === 0) return 'error';
    return null;
  }

  getValidationStateIngredients() {
    const ingredientsLength = this.state.ingredients.length;
    if (ingredientsLength >= 1) return 'success';
    else if (ingredientsLength === 0) return 'error';
    return null;
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleIngredients(e) {
    this.setState({ ingredients: e.target.value });
  }

  handleClose() {
    this.setState({
      show: false,
      modalHeader: "Article Title",
      addButHeader: "Submit",
      title: "",
      ingredients: ""
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  addRecipeButModal() {
    this.setState({
      show: false,
      title: this.state.title,
      ingredients: this.state.ingredients,
      modalHeader: "Add a Recipe",
      addButHeader: "Submit",
      recipes:
        this.state.addButHeader === "Submit"
          ? [
              ...this.state.recipes,
              { title: this.state.title, ingredients: this.state.ingredients }
            ]
          : this.state.recipes
              .slice(0, this.state.index)
              .concat(
                {
                  title: this.state.title,
                  ingredients: this.state.ingredients
                },
                this.state.recipes.slice(this.state.index + 1)
              )
    });
    this.setState({
      title: "",
      ingredients: ""
    });

    localStorage.setItem(
      "_article_recipes",
      JSON.stringify(
        this.state.addButHeader === "Submit"
          ? [
              ...this.state.recipes,
              { title: this.state.title, ingredients: this.state.ingredients }
            ]
          : this.state.recipes
              .slice(0, this.state.index)
              .concat(
                {
                  title: this.state.title,
                  ingredients: this.state.ingredients
                },
                this.state.recipes.slice(this.state.index + 1)
              )
      )
    );
  }
  openCardForEdit(i) {
    this.setState({
      index: i,
      show: true,
      title: this.state.recipes[i].title,
      ingredients: this.state.recipes[i].ingredients,
      modalHeader: "Edit Article",
      addButHeader: "Edit"
    });
  }

  render() {
     return (
      <div>
      <div id="someButtonContainer">
          <h3> Articles</h3>
        <Button id="addRecipeBtn" bsSize="large" onClick={this.handleShow} block>
          Add New
        </Button>
      </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="modalTitle">{this.state.modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStateTitle()}
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
              type="text"
              value={this.state.title}
              placeholder="Enter title"
              onChange={this.handleTitle}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation</HelpBlock>
            </FormGroup>
            <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStateIngredients()}
            >
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
              componentClass="textarea"
              value={this.state.ingredients}
              placeholder="Enter ingredients"
              onChange={this.handleIngredients}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation</HelpBlock>
           </FormGroup>
           </form>
         </Modal.Body>
         <Modal.Footer>
            <Button id="addBut" onClick={this.addRecipeButModal}>{this.state.addButHeader}
            </Button>
            <Button id="closeBut" onClick={this.handleClose}><FontAwesomeIcon icon="times" /></Button>
         </Modal.Footer>
      </Modal>
      <ListArticles recipes={this.state.recipes} openCardForEdit={this.openCardForEdit} />
      </div>
    );
  }
}

export default AddRecipe;
