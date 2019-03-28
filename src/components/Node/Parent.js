import React, { Component } from 'react';
import AddIcon from '../../images/add.svg';
import EditIcon from '../../images/edit.svg';
import RemoveIcon from '../../images/remove.svg';

class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
        }

        this.addNode = this.addNode.bind(this);
        this.editNode = this.editNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    addNode() {
        let existingNodes = this.state.nodes;
        let nodeObj = {};
        nodeObj.text = 'Node';
        // nodeObj.childNodes = [];
        nodeObj.number = existingNodes.length + 1;
        nodeObj.marginLeft = '30px';
        nodeObj.edit = false;
        existingNodes.push(nodeObj);
        this.setState({nodes : [...existingNodes]});
    }
    editNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes[index].edit = true;
        this.setState({nodes : [...existingNodes]});
    }
    changeText(index, event) {
        debugger
        event.preventDefault();
        let existingNodes = this.state.nodes;
        existingNodes[index].text = event.target.value;
        this.setState({nodes : existingNodes});
    }
    removeNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes.splice(index, 1);
        this.setState({nodes : [...existingNodes]});
    }

    render() {
        var text = `${this.props.text} - ${this.props.number}`;
        return (
            <div style={{marginLeft : `${this.props.marginLeft}`}}>
                <div>
                    {
                        this.props.enableEdit ? 
                            <input name={this.props.index} onChange={(event) => this.changeText(this.props.index, event)} />
                        :   <h3 className="inline_display">{text}</h3>
                    }
                    <div className="inline_display">
                        <img className="icon_image" src={AddIcon} onClick={this.addNode} />
                        <img className="icon_image" src={EditIcon} onClick={() => this.props.edit(this.props.index)} />
                        <img className="icon_image" src={RemoveIcon} onClick={() => this.props.remove(this.props.index)} />
                    </div>
                </div>
                {
                    this.state.nodes.map((item, index) => {
                        return (
                            <Parent 
                                key={index} 
                                text={item.text} 
                                number={item.number}
                                index={index}
                                enableEdit={item.edit}
                                add={this.addNode}
                                edit={this.editNode}
                                remove={this.removeNode}
                                marginLeft={item.marginLeft}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default Parent;