import AnnounceBar from '../components/AnnounceBar';

const stories = {
  title: 'AnnounceBar',
  component: AnnounceBar,
};

export default stories;

function TemplateStory(args) {
  return <AnnounceBar {...args} />;
}

const WithTypeSuccess = TemplateStory.bind({});
WithTypeSuccess.args = {
  title: 'Success',
  content: 'This is a success message',
  ctaLabel: 'Click me',
  type: 'success',
};

export { WithTypeSuccess };
