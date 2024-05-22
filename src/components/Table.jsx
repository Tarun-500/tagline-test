import { useState, useEffect } from 'react';
import { data1, data2 } from '../data/data';
import { Table, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

function TableData() {
    const [state, setState] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [showOnlyTrue, setShowOnlyTrue] = useState(false);


    // category
    const [filterOne, setFilterOne] = useState(false);
    const [filterTwo, setFilterTwo] = useState(false);

    // type
    const [typeA, setTypeA] = useState(false);
    const [typeB, setTypeB] = useState(false);
    const [typeC, setTypeC] = useState(false);

    //city
    const [cityOne, setCityOne] = useState(false);
    const [cityTwo, setCityTwo] = useState(false);
    const [cityThree, setCityThree] = useState(false);

    const [showOnlyFalse, setShowOnlyFalse] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const data = data1.length > 0 ? data1 : data2?.length > 0 ? data2 : [];

    useEffect(() => {
        filterData();
    }, [searchQuery, showOnlyTrue, showOnlyFalse, filterOne, filterTwo, typeA, typeB, typeC, cityOne, cityTwo, cityThree]);

    const filterData = () => {
        const filtered = data.filter(item => {
            const isMatched = (
                (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
                ((item.active !== undefined) && item.active.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.mall && item.mall.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
                ((item.rating !== undefined) && item.rating.toString().toLowerCase().includes(searchQuery.toLowerCase()))
            );


            const isCategoryMatched = (
                (!filterOne && !filterTwo) ||
                (filterOne && item.category.toLowerCase() === 'one') ||
                (filterTwo && item.category.toLowerCase() === 'two')
            );

            const isTypeMatched = (
                (!typeA && !typeB && !typeC) ||
                (typeA && item.type.toLowerCase() === 'a') ||
                (typeB && item.type.toLowerCase() === 'b') ||
                (typeC && item.type.toLowerCase() === 'c')
            );

            const isActiveMatched = (
                (!showOnlyTrue && !showOnlyFalse) ||
                (showOnlyTrue && item.active === 'TRUE') ||
                (showOnlyFalse && item.active === 'FALSE')
            );


            const isCityMatched = (
                (!cityOne && !cityTwo && !cityThree) ||
                (cityOne && item.city.toLowerCase() === 'dallas') ||
                (cityTwo && item.city.toLowerCase() === 'san francisco') ||
                (cityThree && item.city.toLowerCase() === 'denver')
            );

            return isMatched && isCategoryMatched && isTypeMatched && isActiveMatched && isCityMatched;

        });
        setFilteredData(filtered);
    };


    return (
        <>
            <Card className="mb-4">
                <CardBody>
                    <Row>
                        <Col md={4} lg={3} xl={2}>
                            <h4> City </h4>
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={cityOne}
                                    onChange={() => {
                                        setCityOne(!cityOne);
                                    }}
                                />
                                <Label check>Dallas</Label>
                            </FormGroup>
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={cityTwo}
                                    onClick={() => {
                                        setCityTwo(!cityTwo);
                                    }}
                                />
                                <Label check>San francisco</Label>
                            </FormGroup>
                            <FormGroup switch>
                                <Input
                                    type="switch"
                                    checked={cityThree}
                                    onClick={() => {
                                        setCityThree(!cityThree);
                                    }}
                                />
                                <Label check> Denver</Label>
                            </FormGroup>
                        </Col>

                        <Col md={4} lg={3} xl={2}>
                            <h4> Category </h4>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={filterOne}
                                        onChange={() => setFilterOne(!filterOne)}
                                    />
                                    One
                                </Label>
                            </FormGroup>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={filterTwo}
                                        onChange={() => setFilterTwo(!filterTwo)}
                                    />
                                    Two
                                </Label>
                            </FormGroup>
                        </Col>


                        <Col md={4} lg={3} xl={2}>
                            <h4> Type </h4>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={typeA}
                                        onChange={() => setTypeA(!typeA)}
                                    />
                                    A
                                </Label>
                            </FormGroup>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={typeB}
                                        onChange={() => setTypeB(!typeB)}
                                    />
                                    B
                                </Label>
                            </FormGroup>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={typeC}
                                        onChange={() => setTypeC(!typeC)}
                                    />
                                    C
                                </Label>
                            </FormGroup>
                        </Col>

                        <Col md={4} lg={3} xl={2}>
                            <h4>Active</h4>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={showOnlyTrue}
                                        onChange={() => setShowOnlyTrue(!showOnlyTrue)}
                                    />
                                    True
                                </Label>
                            </FormGroup>
                            <FormGroup switch>
                                <Label check>
                                    <Input
                                        type="switch"
                                        checked={showOnlyFalse}
                                        onChange={() => setShowOnlyFalse(!showOnlyFalse)}
                                    />
                                    False
                                </Label>
                            </FormGroup>
                        </Col>

                        <Col md={4} lg={3} xl={4}>
                            <FormGroup className="mb-0">
                                <Label for="search">Search</Label>
                                <Input
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="Enter search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {data === data1 && (
                            <>
                                <th>Id</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Active</th>
                            </>
                        )}
                        {data === data2 && (
                            <>
                                <th>Id</th>
                                <th>Mall</th>
                                <th>Address</th>
                                <th>Category</th>
                                <th>Rating</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            {data === data1 && (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.city}</td>
                                    <td>{item.category}</td>
                                    <td>{item.type}</td>
                                    <td>{item.active}</td>
                                </>
                            )}
                            {data === data2 && (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.mall}</td>
                                    <td>{item.address}</td>
                                    <td>{item.category}</td>
                                    <td>{item.rating}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default TableData;

