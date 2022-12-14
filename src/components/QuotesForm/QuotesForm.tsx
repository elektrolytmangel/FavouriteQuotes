import { useState } from 'react';
import Quote from "../../model/Quote";
import { Button, Form } from 'react-bootstrap';
import QuoteType from '../../model/QuoteType';
import backend from '../../api/backend';

const QuotesForm = () => {
  const [state, setState] = useState<Quote>(new Quote());

  const getOptions = () => {
    const options: QuoteType[] = [];
    for (const t of Object.values(QuoteType)) {
      options.push(t);
    }

    return options;
  }

  const onHandleSubmit = (e: React.FormEvent, data: Quote | undefined) => {
    e.preventDefault();
    backend.post('/quotes', data)
      .then(
        response => {
          console.log(response.data);
          alert(`Added new quote:${JSON.stringify(response.data)}`);
          setState(new Quote());
        },
        error => console.log(error?.message)
      );
  }

  return (
    <>
      <h1>Add new quote</h1>
      <Form onSubmit={(e) => onHandleSubmit(e, state)} className="well">
        <Form.Group className={state.content === '' ? 'control-group error' : ''}>
          <Form.Label>Content</Form.Label>
          <Form.Control type="text" placeholder="someText" onChange={(e) => { setState(s => { return { ...s, content: e.target.value } as Quote }) }} value={state.content} />
        </Form.Group>
        <Form.Group className={state.author === '' ? 'control-group error' : ''}>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="someText" onChange={(e) => { setState(s => { return { ...s, author: e.target.value } as Quote }) }} value={state.author} />
        </Form.Group>
        <Form.Group className={state.additionalInformation === '' ? 'control-group error' : ''}>
          <Form.Label>Additional Information</Form.Label>
          <Form.Control type="text" placeholder="someText" onChange={(e) => { setState(s => { return { ...s, additionalInformation: e.target.value } as Quote }) }} value={state.additionalInformation} />
        </Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Group>
          <Form.Select onChange={(e) => { setState(s => { return { ...s, type: e.target.value as QuoteType } as Quote }) }} value={state.type}>
            {getOptions().map(x => <option key={x}>{x}</option>)}
          </Form.Select>
        </Form.Group>
        <Button style={{ marginTop: '5px' }} variant='success' type='submit'>Submit</Button>
      </Form>
      <p>{JSON.stringify(state)}</p>
    </>
  )
}

export default QuotesForm;