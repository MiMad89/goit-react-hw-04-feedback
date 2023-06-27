import React, { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Section } from './Section';
import { Notification } from './Notification';
import './App.css';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return ((feedback.good / countTotalFeedback()) * 100).toFixed(2);
  };

  const stateChange = (event) => {
    setFeedback((prevState) => ({
      ...prevState,
      [event]: prevState[event] + 1,
    }));
  };

  return (
    <Section title={'Please leave feedback'}>
      <FeedbackOptions
        options={Object.keys(feedback)}
        onLeaveFeedback={stateChange}
      />
      {countTotalFeedback() > 0 ? (
        <Statistics
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};
