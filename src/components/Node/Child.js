import React, { Component } from 'react';
import AddIcon from '../../images/add.svg';
import EditIcon from '../../images/edit.svg';
import RemoveIcon from '../../images/remove.svg';
import DownArrow from '../../images/down_arrow.svg';

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
        }

        this.addNode = this.addNode.bind(this);
        this.editNode = this.editNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.changeText = this.changeText.bind(this);
        this.closeInput = this.closeInput.bind(this);
        this.collapseNode = this.collapseNode.bind(this);
    }

    addNode() {
        let existingNodes = this.state.nodes;
        let nodeObj = {};
        nodeObj.text = 'Node';
        // nodeObj.childNodes = [];
        nodeObj.number = existingNodes.length + 1;
        nodeObj.marginLeft = '30px';
        nodeObj.edit = false;
        nodeObj.open = true;
        existingNodes.push(nodeObj);
        this.setState({nodes : [...existingNodes]});
    }
    editNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes[index].edit = true;
        this.setState({nodes : [...existingNodes]});
    }
    changeText(index, event) {
        let existingNodes = this.state.nodes;
        existingNodes[index].text = event.target.value;
        existingNodes[index].number = '';
        this.setState({nodes : existingNodes});
    }
    closeInput(index, event) {
        if(event.which === 13) {
            let existingNodes = this.state.nodes;
            existingNodes[index].edit = false;
            this.setState({nodes : [...existingNodes]});
        }
    }
    removeNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes.splice(index, 1);
        this.setState({nodes : [...existingNodes]});
        // this.removeNode(0, existingNodes.length);
    }
    collapseNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes[index].open = !existingNodes[index].open;
        this.setState({nodes : [...existingNodes]});
    }

    render() {
        var text = `${this.props.text} ${this.props.number}`;
        return (
            <div style={{marginLeft : `${this.props.marginLeft}`}} >
                <div>
                    <div>
                        <img 
                            className={`icon_image`} 
                            src={DownArrow} alt="Down arrow icon"
                            onClick={() => this.props.collapseNode(this.props.index)} />
                        {
                            this.props.enableEdit ? 
                                <input 
                                    autoFocus
                                    onChange={(event) => this.props.changeText(this.props.index, event)}
                                    onKeyPress={(event) => this.props.closeInput(this.props.index, event)} 
                                />
                            :   <h3 className="inline_display">{text}</h3>
                        }
                        <div className="inline_display">
                            <img 
                                className="icon_image" 
                                alt="Add icon" 
                                src={AddIcon} 
                                onClick={this.addNode} 
                            />
                            <img 
                                className="icon_image" 
                                alt="Edit icon" 
                                src={EditIcon} 
                                onClick={() => this.props.edit(this.props.index)} 
                            />
                            <img 
                                className="icon_image" 
                                alt="Remove icon" 
                                src={RemoveIcon} 
                                onClick={() => this.props.remove(this.props.index)} 
                            />
                        </div>
                    </div>
                    {   this.props.open ?
                            this.state.nodes.map((item, index) => {
                                return (
                                    <Child 
                                        key={index} 
                                        text={item.text} 
                                        number={item.number}
                                        index={index}
                                        enableEdit={item.edit}
                                        add={this.addNode}
                                        edit={this.editNode}
                                        remove={this.removeNode}
                                        marginLeft={item.marginLeft}
                                        changeText={this.changeText}
                                        closeInput={this.closeInput}
                                        collapseNode={this.collapseNode}
                                        open={item.open}
                                    />
                                )
                            })
                        :   ''
                    }
                </div>
            </div>
        );
    }
}

export default Child;