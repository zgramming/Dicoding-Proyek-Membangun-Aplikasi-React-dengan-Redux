import ThumbUpAction from '../components/ThumbUpAction';

const stories = {
  title: 'ThumbUpAction',
  component: ThumbUpAction,
};

export default stories;

function TemplateStory(args) {
  return <ThumbUpAction {...args} />;
}

const Component = TemplateStory.bind({});

Component.args = {
  number: 1,
  isActive: true,
};

export { Component };
