import { useState, useEffect } from 'react';
import { data } from '../data/data';
import { Table, Row, Col, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

function TableData() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showOnlyTrue, setShowOnlyTrue] = useState(false);
    const [filterOne, setFilterOne] = useState(false);
    const [filterTwo, setFilterTwo] = useState(false);
    const [typeA, setTypeA] = useState(false);
    const [typeB, setTypeB] = useState(false);
    const [typeC, setTypeC] = useState(false);
    const [rating1, setRating1] = useState(false);
    const [rating2, setRating2] = useState(false);
    const [rating3, setRating3] = useState(false);
    const [cityOne, setCityOne] = useState(false);
    const [cityTwo, setCityTwo] = useState(false);
    const [cityThree, setCityThree] = useState(false);
    const [addressOne, setAddressOne] = useState(false);
    const [addressTwo, setAddressTwo] = useState(false);
    const [addressThree, setAddressThree] = useState(false);
    const [addressFour, setAddressFour] = useState(false);
    const [showOnlyFalse, setShowOnlyFalse] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        filterData();
    }, [searchQuery, showOnlyTrue, showOnlyFalse, filterOne, filterTwo, typeA, typeB, typeC, rating1, rating2, rating3, cityOne, cityTwo, cityThree, addressOne, addressTwo, addressThree, addressFour]);

    const keys = data.reduce((acc, item) => {
        Object.keys(item).forEach(key => {
            if (!acc.includes(key)) {
                acc.push(key);
            }
        });
        return acc;
    }, []);

    const filterData = () => {
        const filtered = data && data.filter(item => {
            const isMatched = (
                (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.mall && item.mall.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.rating && item.rating.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
                ((item.active !== undefined) && item.active.toString().toLowerCase().includes(searchQuery.toLowerCase()))
            );

            const isCategoryMatched = !keys.includes("category") || (
                (!filterOne && !filterTwo) ||
                (filterOne && item.category?.toLowerCase() === 'one') ||
                (filterTwo && item.category?.toLowerCase() === 'two')
            );

            const isTypeMatched = !keys.includes("type") || (
                (!typeA && !typeB && !typeC) ||
                (typeA && item.type?.toLowerCase() === 'a') ||
                (typeB && item.type?.toLowerCase() === 'b') ||
                (typeC && item.type?.toLowerCase() === 'c')
            );

            const isRatingMatched = !keys.includes("rating") || (
                (!rating1 && !rating2 && !rating3) ||
                (rating1 && item.rating?.toLowerCase() === 'a') ||
                (rating2 && item.rating?.toLowerCase() === 'b') ||
                (rating3 && item.rating?.toLowerCase() === 'c')
            );

            const isActiveMatched = !keys.includes("active") || (
                (!showOnlyTrue && !showOnlyFalse) ||
                (showOnlyTrue && item.active === 'TRUE') ||
                (showOnlyFalse && item.active === 'FALSE')
            );

            const isCityMatched = !keys.includes("city") || (
                (!cityOne && !cityTwo && !cityThree) ||
                (cityOne && item.city?.toLowerCase() === 'dallas') ||
                (cityTwo && item.city?.toLowerCase() === 'san francisco') ||
                (cityThree && item.city?.toLowerCase() === 'denver')
            );

            const isAddressMatched = !keys.includes("address") || (
                (!addressOne && !addressTwo && !addressThree  && !addressFour) ||
                (addressOne && item.address?.toLowerCase() === 'surat') ||
                (addressTwo && item.address?.toLowerCase() === 'dallas') ||
                (addressThree && item.address?.toLowerCase() === 'san francisco') ||
                (addressFour && item.address?.toLowerCase() === 'denver')
            );

            return isMatched && isCategoryMatched && isTypeMatched && isRatingMatched && isActiveMatched && isCityMatched && isAddressMatched;
        });
        setFilteredData(filtered);
    };

    return (
        <>
            <Card className="mb-4">
                <CardBody>
                    <Row>

                        {keys.includes("address") && (
                            <Col md={4} lg={3} xl={2}>
                                <h4> Address </h4>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={addressOne}
                                        onChange={() => setAddressOne(!addressOne)}
                                    />
                                    <Label check> Surat </Label>
                                </FormGroup>

                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={addressTwo}
                                        onChange={() => setAddressTwo(!addressTwo)}
                                    />
                                    <Label check>Dallas</Label>
                                </FormGroup>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={addressThree}
                                        onChange={() => setAddressThree(!addressThree)}
                                    />
                                    <Label check>San Francisco</Label>
                                </FormGroup>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={addressFour}
                                        onChange={() => setAddressFour(!addressFour)}
                                    />
                                    <Label check>Denver</Label>
                                </FormGroup>
                            </Col>
                        )}

                        {keys.includes("city") && (
                            <Col md={4} lg={3} xl={2}>
                                <h4> City </h4>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={cityOne}
                                        onChange={() => setCityOne(!cityOne)}
                                    />
                                    <Label check>Dallas</Label>
                                </FormGroup>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={cityTwo}
                                        onChange={() => setCityTwo(!cityTwo)}
                                    />
                                    <Label check>San Francisco</Label>
                                </FormGroup>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={cityThree}
                                        onChange={() => setCityThree(!cityThree)}
                                    />
                                    <Label check>Denver</Label>
                                </FormGroup>
                            </Col>
                        )}

                        {keys.includes("category") && (
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
                        )}

                        {keys.includes("type") && (
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
                        )}

                        {keys.includes("rating") && (
                            <Col md={4} lg={3} xl={2}>
                                <h4> Rating </h4>
                                <FormGroup switch>
                                    <Label check>
                                        <Input
                                            type="switch"
                                            checked={rating1}
                                            onChange={() => setRating1(!rating1)}
                                        />
                                        A
                                    </Label>
                                </FormGroup>
                                <FormGroup switch>
                                    <Label check>
                                        <Input
                                            type="switch"
                                            checked={rating2}
                                            onChange={() => setRating2(!rating2)}
                                        />
                                        B
                                    </Label>
                                </FormGroup>
                                <FormGroup switch>
                                    <Label check>
                                        <Input
                                            type="switch"
                                            checked={rating3}
                                            onChange={() => setRating3(!rating3)}
                                        />
                                        C
                                    </Label>
                                </FormGroup>
                            </Col>
                        )}

                        {keys.includes("active") && (<Col md={4} lg={3} xl={2}>
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
                        </Col>)}


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
                        {keys.map((key) => {
                            return <th key={key}>{key}</th>
                        })}

                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            {keys.map(key => (
                                <td key={key}>{item[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default TableData;

