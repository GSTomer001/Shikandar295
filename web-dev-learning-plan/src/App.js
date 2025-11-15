import React, { useState, useEffect } from 'react';

function App() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const learningPlan = [
    {
      week: 1,
      title: "HTML & CSS Fundamentals",
      goal: "Master the building blocks of web pages",
      description: "Learn HTML structure, semantic elements, CSS styling, layouts, and responsive design basics.",
      dailyTasks: [
        { day: 1, task: "HTML basics: tags, elements, attributes, document structure" },
        { day: 2, task: "Semantic HTML5: header, nav, main, article, section, footer" },
        { day: 3, task: "CSS fundamentals: selectors, properties, box model, colors" },
        { day: 4, task: "CSS layouts: Flexbox basics and practical examples" },
        { day: 5, task: "CSS Grid: creating complex layouts" },
        { day: 6, task: "Responsive design: media queries, mobile-first approach" },
        { day: 7, task: "Project: Build a responsive personal portfolio page" }
      ],
      resources: [
        { name: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", description: "Comprehensive HTML reference and tutorials" },
        { name: "CSS-Tricks Complete Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", description: "Visual guide to mastering Flexbox" },
        { name: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", description: "Interactive HTML/CSS certification course" }
      ]
    },
    {
      week: 2,
      title: "JavaScript Fundamentals",
      goal: "Learn programming basics and DOM manipulation",
      description: "Understand JavaScript syntax, data types, functions, and how to make web pages interactive.",
      dailyTasks: [
        { day: 1, task: "JavaScript basics: variables, data types, operators, console" },
        { day: 2, task: "Control flow: if/else, switch, loops (for, while)" },
        { day: 3, task: "Functions: declarations, expressions, arrow functions, scope" },
        { day: 4, task: "Arrays and Objects: methods, iteration, destructuring" },
        { day: 5, task: "DOM manipulation: selecting elements, changing content/styles" },
        { day: 6, task: "Events: event listeners, event handling, form validation" },
        { day: 7, task: "Project: Build an interactive to-do list application" }
      ],
      resources: [
        { name: "JavaScript.info", url: "https://javascript.info/", description: "Modern JavaScript tutorial from basics to advanced" },
        { name: "Eloquent JavaScript (Free Book)", url: "https://eloquentjavascript.net/", description: "In-depth JavaScript programming book" },
        { name: "freeCodeCamp JavaScript Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", description: "Interactive JavaScript certification" }
      ]
    },
    {
      week: 3,
      title: "Modern JavaScript & APIs",
      goal: "Master ES6+ features and asynchronous programming",
      description: "Learn modern JavaScript features, fetch data from APIs, and work with JSON.",
      dailyTasks: [
        { day: 1, task: "ES6+ features: let/const, template literals, spread/rest operators" },
        { day: 2, task: "Promises and async/await: handling asynchronous operations" },
        { day: 3, task: "Fetch API: making HTTP requests, handling responses" },
        { day: 4, task: "Working with JSON: parsing, stringifying, API data" },
        { day: 5, task: "Error handling: try/catch, error objects, debugging" },
        { day: 6, task: "Local Storage: saving and retrieving data in the browser" },
        { day: 7, task: "Project: Build a weather app using a public API" }
      ],
      resources: [
        { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", description: "Complete JavaScript language guide" },
        { name: "Public APIs List", url: "https://github.com/public-apis/public-apis", description: "Collection of free APIs for projects" },
        { name: "JavaScript30", url: "https://javascript30.com/", description: "30 day vanilla JS coding challenge" }
      ]
    },
    {
      week: 4,
      title: "React & Modern Development",
      goal: "Build dynamic web applications with React",
      description: "Learn React fundamentals, component-based architecture, and modern development workflow.",
      dailyTasks: [
        { day: 1, task: "React basics: JSX, components, props, virtual DOM" },
        { day: 2, task: "State management: useState hook, state updates, lifting state" },
        { day: 3, task: "Effects and lifecycle: useEffect hook, side effects, cleanup" },
        { day: 4, task: "Lists and forms: mapping data, controlled components, validation" },
        { day: 5, task: "React Router: navigation, routes, dynamic routing" },
        { day: 6, task: "API integration: fetching data in React, loading states" },
        { day: 7, task: "Final Project: Build a multi-page React application (blog, shop, etc.)" }
      ],
      resources: [
        { name: "React Official Documentation", url: "https://react.dev/", description: "Official React docs with interactive tutorials" },
        { name: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact", description: "Interactive React course with coding challenges" },
        { name: "Full Stack Open", url: "https://fullstackopen.com/en/", description: "University of Helsinki's free full stack course" }
      ]
    }
  ];

  const toggleTask = (week, day) => {
    const taskId = `${week}-${day}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getWeekProgress = (week) => {
    const weekTasks = learningPlan[week - 1].dailyTasks;
    const completed = weekTasks.filter(task => 
      completedTasks[`${week}-${task.day}`]
    ).length;
    return Math.round((completed / weekTasks.length) * 100);
  };

  const getTotalProgress = () => {
    const totalTasks = learningPlan.reduce((sum, week) => sum + week.dailyTasks.length, 0);
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completedCount / totalTasks) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Web Developer Learning Plan
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your 4-week journey to becoming a skilled web developer
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">Overall Progress</span>
              <span className="text-2xl font-bold text-indigo-600">{getTotalProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getTotalProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {[1, 2, 3, 4].map(week => (
            <button
              key={week}
              onClick={() => setCurrentWeek(week)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentWeek === week
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 shadow'
              }`}
            >
              Week {week}
              <span className="ml-2 text-sm">({getWeekProgress(week)}%)</span>
            </button>
          ))}
        </div>

        {/* Current Week Content */}
        {learningPlan.map(week => (
          currentWeek === week.week && (
            <div key={week.week} className="space-y-6">
              {/* Week Header */}
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Week {week.week}: {week.title}
                    </h2>
                    <p className="text-lg text-indigo-600 font-semibold mb-2">
                      🎯 Goal: {week.goal}
                    </p>
                    <p className="text-gray-600">
                      {week.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-indigo-600">
                      {getWeekProgress(week.week)}%
                    </div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getWeekProgress(week.week)}%` }}
                  ></div>
                </div>
              </div>

              {/* Daily Tasks */}
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Daily Tasks</h3>
                <div className="space-y-3">
                  {week.dailyTasks.map(task => {
                    const taskId = `${week.week}-${task.day}`;
                    const isCompleted = completedTasks[taskId];
                    return (
                      <div
                        key={task.day}
                        className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                          isCompleted 
                            ? 'bg-green-50 border-2 border-green-200' 
                            : 'bg-gray-50 border-2 border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => toggleTask(week.week, task.day)}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300 hover:border-indigo-500'
                          }`}>
                            {isCompleted && (
                              <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Day {task.day}
                            </span>
                          </div>
                          <p className={`text-gray-700 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Top 3 Resources</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {week.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {resource.name}
                        </h4>
                        <svg className="w-5 h-5 text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {resource.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">💡 Pro Tips for Week {week.week}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Practice coding every day, even if it's just 30 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Build projects to reinforce what you learn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Join developer communities and ask questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Don't rush - understanding is more important than speed</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        ))}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-lg">
            🚀 Stay consistent, practice daily, and you'll be building amazing web applications in no time!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
