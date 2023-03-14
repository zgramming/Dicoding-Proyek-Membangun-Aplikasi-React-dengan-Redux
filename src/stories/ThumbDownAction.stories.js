import ThumbDownAction from '../components/ThumbDownAction';

const stories = {
  title: 'ThumbDownAction',
  component: ThumbDownAction,
};

export default stories;

function TemplateStory(args) {
  return <ThumbDownAction {...args} />;
}

const Component = TemplateStory.bind({});

Component.args = {
  number: 1,
  isActive: true,
};

export { Component };
