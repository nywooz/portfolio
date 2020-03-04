import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Label, Table, Pagination} from 'semantic-ui-react'
import _ from 'lodash';
import { IoIosColorWand } from 'react-icons/io';

import {TABLE_HEADER, BLOOD_TYPES} from './common/global-constants/PotterPageConstants';

const WAND_LENGTH = [',12 1/4"', ',15', ',9 1/2"', ',10 3/4']
const WAND_TYPES =[
'Aspen', 'Sycamore',
 'Fir', 'Hawthorn', 
 'Hornbeam', 'Larch', 
 'Spruce','Blackthorn', 
 'Rowan', 'Cherry', 
 'Elm', 'Dogwood'];

let numberOfPages = 0;
class PotterCharacterTable extends Component {
    
    state = {activePage: 1};
   
    renderTableRows = () => {
    const {potterCharacters} = this.props;

    const tableRows = potterCharacters.length > 0 && this.props.potterCharacters
    .filter((item) => {return item.bloodStatus !== 'unknown'})
    .map((item,key) => {

        const {_id, name, species, house, bloodStatus, wand, boggart, patronus, dumbledoresArmy, deathEater} = item;
        const wandType = wand ? wand : `${WAND_TYPES[_.random(0,11, false)]} ${WAND_LENGTH[_.random(0,3, false)]}`;
        const characterBoggart = boggart ? boggart : 'undisclosed';
        const characterPatronus = patronus ? patronus : 'undisclosed';

        return (
            <Table.Row key={_id} onClick={() => {console.log(name); }} verticalAlign='top'>
                <Table.Cell>{key+1}</Table.Cell>
                <Table.Cell width={3}>{name}<br /><Label as='a' image>{species}</Label></Table.Cell>
                <Table.Cell>{house}</Table.Cell>
                <Table.Cell 
                    positive={bloodStatus === BLOOD_TYPES.PURE_BLOOD}
                    negative={bloodStatus === BLOOD_TYPES.MUGGLE}
                    warning={bloodStatus === BLOOD_TYPES.HALF_BLOOD}
                >
                {bloodStatus}
                </Table.Cell>
                <Table.Cell width={2}>{wandType} &nbsp;<IoIosColorWand color="blue" size="1.22345em"/></Table.Cell>
                <Table.Cell width={2}>{characterBoggart}</Table.Cell>
                <Table.Cell>{characterPatronus}</Table.Cell>
                <Table.Cell positive={dumbledoresArmy} negative={deathEater}>{dumbledoresArmy ? 'Dumbledore Army' : deathEater ? 'DeathEater' : 'unknown'}</Table.Cell>
            </Table.Row>
        )
    });
    numberOfPages = tableRows && Math.floor(tableRows.length/10);
    numberOfPages = tableRows && tableRows.length%10 ? numberOfPages+=1 : numberOfPages;
    const reducedTableRows = tableRows && tableRows.splice((this.state.activePage-1)*10, 10);
    
    return reducedTableRows;
    }

    render() {

        return (
            <div >
            <Table striped selectable style={{boxShadow: '0 0 5px #d4d4d5'}}>
                <Table.Header>
                    <Table.Row>
                        {Object.keys(TABLE_HEADER).map((key, idx) => {
                            return (<Table.HeaderCell key={idx}>{TABLE_HEADER[key]}</Table.HeaderCell>)
                        })}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.renderTableRows()}
                </Table.Body>
            </Table>
            <center>
                <Pagination
                    defaultActivePage={1}
                    // firstItem={null}
                    // lastItem={null}
                    pointing
                    secondary
                    totalPages={numberOfPages}
                    onPageChange={(_,{activePage})=> {this.setState({activePage})}}
                />
            </center>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    potterCharacters: state.potterReducer.potterCharacters
})


export default connect(mapStateToProps)(PotterCharacterTable);