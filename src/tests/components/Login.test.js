import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Login from '../../components/Login';
import {ApiGateway} from "../stubs/apigateway";
import EventBus from "../../eventbus/event-bus";

let apiGateway;
let eventBus;

beforeEach(() => {
  apiGateway = new ApiGateway();
  eventBus = new EventBus();
})

function fillField(container, id, value) {
  fireEvent.change(screen.getByTestId(id), {target: {value: value}})
}

function clickButton(buttonName) {
  fireEvent.click(screen.getByText(buttonName));
}

it('shouldPassThroughCorrectLoginAndLogoutFlow', async() => {
  const eventBusSpy = jest.spyOn(eventBus, 'dispatch');
  const loginSpy = jest.spyOn(Login.prototype, 'setState');

  let {container} = render(<Login apiGateway={apiGateway} eventBus={eventBus}/>);
  fillField(container,'urlInput', 'http://localhost:8080')
  fillField(container,'userInput', 'test')
  fillField(container, 'passInput', 'rody')

  //login
  clickButton("Login")
  expect(eventBusSpy).toHaveBeenCalledTimes(1)
  expect(loginSpy).toHaveBeenCalledWith({token:'tokentje'})

  // logout
  await waitFor(() => { eventBus.dispatch('logged-out') });
  expect(loginSpy).toHaveBeenCalledWith({token:'', user:'',serverlocation:''})
});
