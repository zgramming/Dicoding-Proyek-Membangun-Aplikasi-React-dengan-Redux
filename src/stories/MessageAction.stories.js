import MessageAction from '../components/MessageAction';

const stories = {
  title: 'MessageAction',
  component: MessageAction,
};

export default stories;

function TemplateStory(args) {
  return <MessageAction {...args} />;
}

const Component = TemplateStory.bind({});

Component.args = {
  number: 1,
  color: 'red',
};

export { Component };
