import {
  UserProfile,
  JobApplication,
  JobListing,
  AptitudeQuestion,
  CodingProblem,
  LeaderboardUser,
  RoadmapStep,
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'user_chandana_01',
  name: 'Chandana',
  email: 'chandana@gcek.ac.in',
  college: 'Government College of Engineering Kalahandi (GCEK)',
  batch: '2025',
  targetRole: 'MERN Stack Developer',
  readinessScore: 78,
  streakDays: 14,
  dailyGoalSolved: 3,
  dailyGoalTarget: 5,
  scores: {
    resumeSkills: 26, // out of 30
    targetRoleMatch: 18, // out of 25
    experienceProjects: 15, // out of 20
    interviewReadiness: 10, // out of 15
    profileCompleteness: 9, // out of 10
  },
};

export const initialApplications: JobApplication[] = [
  {
    id: 'app_1',
    company: 'Google',
    role: 'SDE Intern',
    appliedDate: 'Sep 20',
    status: 'Interview',
    location: 'Bengaluru / Hyderabad',
    logoLetter: 'G',
    logoBg: 'bg-red-50 text-red-600 border border-red-200',
    salary: '₹1,00,000 / month',
    notes: 'Technical Round 1 scheduled on Friday. DSA and System Design basics.',
  },
  {
    id: 'app_2',
    company: 'Microsoft',
    role: 'Software Intern',
    appliedDate: 'Sep 18',
    status: 'Applied',
    location: 'Hyderabad',
    logoLetter: 'M',
    logoBg: 'bg-blue-50 text-blue-600 border border-blue-200',
    salary: '₹1,25,000 / month',
    notes: 'Resume under review by university recruiting team.',
  },
  {
    id: 'app_3',
    company: 'Startup XYZ',
    role: 'MERN Intern',
    appliedDate: 'Sep 15',
    status: 'Assessment',
    location: 'Remote',
    logoLetter: 'S',
    logoBg: 'bg-amber-50 text-amber-600 border border-amber-200',
    salary: '₹40,000 / month',
    notes: 'Full-stack take home assignment due in 48 hours.',
  },
  {
    id: 'app_4',
    company: 'Razorpay',
    role: 'Frontend Engineer Intern',
    appliedDate: 'Sep 02',
    status: 'Offer',
    location: 'Bengaluru',
    logoLetter: 'R',
    logoBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    salary: '₹55,000 / month',
    notes: 'Offer letter received! Acceptance deadline Oct 30.',
  },
  {
    id: 'app_5',
    company: 'Amazon',
    role: 'SDE Intern - AWS',
    appliedDate: 'Aug 25',
    status: 'Rejected',
    location: 'Bengaluru',
    logoLetter: 'A',
    logoBg: 'bg-slate-100 text-slate-600 border border-slate-200',
    salary: '₹1,10,000 / month',
    notes: 'Reapply in 6 months. Focus more on DP and Graph questions.',
  },
];

export const sampleJobs: JobListing[] = [
  {
    id: 'job_1',
    title: 'MERN Stack Developer Intern',
    company: 'DevCraft Labs',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    type: 'Internship',
    stipendOrSalary: '₹35,000 - ₹50,000 / month',
    experience: '0-1 years (2024 / 2025 batch)',
    deadline: 'Nov 15, 2026',
    matchScore: 92,
    skillsRequired: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git'],
    description: 'Looking for a passionate junior MERN developer to architect scalable microservices and sleek React client interfaces for high-growth fintech products.',
    eligibility: 'B.Tech / B.E / MCA in CS / IT / allied branches with >= 6.5 CGPA.',
    verified: true,
    postedDate: '2 days ago',
  },
  {
    id: 'job_2',
    title: 'Graduate SDE (Frontend & Cloud)',
    company: 'Infosys Wings',
    location: 'Pune / Hyderabad',
    workMode: 'On-site',
    type: 'Full-time',
    stipendOrSalary: '₹6.5 - ₹9.0 LPA',
    experience: 'Fresher (2025 batch)',
    deadline: 'Nov 30, 2026',
    matchScore: 85,
    skillsRequired: ['JavaScript', 'React', 'HTML5/CSS3', 'Data Structures', 'SQL'],
    description: 'Join the digital transformation squad creating high-traffic enterprise portals with modern web standards and automated CI/CD pipelines.',
    eligibility: 'All B.E/B.Tech graduates with no active backlogs.',
    verified: true,
    postedDate: 'Yesterday',
  },
  {
    id: 'job_3',
    title: 'Backend Developer Intern',
    company: 'CogniScale AI',
    location: 'Remote',
    workMode: 'Remote',
    type: 'Internship',
    stipendOrSalary: '₹45,000 / month',
    experience: 'Students / Freshers',
    deadline: 'Dec 05, 2026',
    matchScore: 78,
    skillsRequired: ['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'TypeScript'],
    description: 'Build robust REST and GraphQL APIs powering real-time AI automation agents.',
    eligibility: 'Passionate coders with at least two demonstrable backend GitHub repositories.',
    verified: true,
    postedDate: '3 days ago',
  },
  {
    id: 'job_4',
    title: 'Software Development Engineer - Campus 2025',
    company: 'PhonePe',
    location: 'Bengaluru',
    workMode: 'On-site',
    type: 'Full-time',
    stipendOrSalary: '₹18.0 - ₹24.0 LPA',
    experience: 'Campus Final Year',
    deadline: 'Nov 20, 2026',
    matchScore: 81,
    skillsRequired: ['Java', 'C++', 'Data Structures', 'Operating Systems', 'DBMS', 'System Design'],
    description: 'Design payment switches handling billions of transactions per month with 99.999% availability.',
    eligibility: 'B.Tech CS/IT with minimum 7.5 CGPA.',
    verified: true,
    postedDate: '5 days ago',
  },
];

export const aptitudeQuestionsBank: AptitudeQuestion[] = [
  // Quantitative
  {
    id: 'apt_q1',
    category: 'Quantitative',
    topic: 'Time and Distance',
    difficulty: 'Easy',
    question: 'A train travels 60 km in 2 hours. What is its speed?',
    options: ['30 km/h', '120 km/h', '20 km/h', '40 km/h'],
    correctAnswerIndex: 0,
    explanation: 'Speed = Distance / Time = 60 km / 2 hours = 30 km/h.',
    formula: 'Speed = Distance ÷ Time',
  },
  {
    id: 'apt_q2',
    category: 'Quantitative',
    topic: 'Profit and Loss',
    difficulty: 'Medium',
    question: 'A shopkeeper sells an article for ₹840 gaining 20% on its cost price. What was the cost price of the article?',
    options: ['₹700', '₹720', '₹680', '₹750'],
    correctAnswerIndex: 0,
    explanation: 'Selling Price (SP) = CP × (1 + Profit%). 840 = CP × 1.2 => CP = 840 / 1.2 = ₹700.',
    formula: 'CP = SP / (1 + P/100)',
  },
  {
    id: 'apt_q3',
    category: 'Quantitative',
    topic: 'Time and Work',
    difficulty: 'Medium',
    question: 'A can complete a work in 12 days and B can do it in 24 days. Working together, in how many days will they finish the work?',
    options: ['8 days', '6 days', '9 days', '10 days'],
    correctAnswerIndex: 0,
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/24. Combined 1-day work = 1/12 + 1/24 = 3/24 = 1/8. Total days = 8 days.",
    formula: 'Time = (A × B) / (A + B)',
  },
  {
    id: 'apt_q4',
    category: 'Quantitative',
    topic: 'Percentages',
    difficulty: 'Easy',
    question: 'If 30% of a number is 150, what is 60% of that number?',
    options: ['300', '250', '350', '200'],
    correctAnswerIndex: 0,
    explanation: 'Since 60% is exactly twice 30%, 60% of the number = 2 × 150 = 300.',
    formula: 'Value = (Target % / Given %) × Given Value',
  },
  {
    id: 'apt_q5',
    category: 'Quantitative',
    topic: 'Averages',
    difficulty: 'Medium',
    question: 'The average of 5 consecutive odd numbers is 27. What is the largest of these numbers?',
    options: ['31', '29', '33', '35'],
    correctAnswerIndex: 0,
    explanation: 'For consecutive odd numbers, the middle number is the average. So the numbers are 23, 25, 27, 29, 31. The largest is 31.',
    formula: 'Average = Sum of elements / Total count',
  },
  // Logical
  {
    id: 'apt_l1',
    category: 'Logical',
    topic: 'Number Series',
    difficulty: 'Easy',
    question: 'What is the next number in the sequence: 4, 9, 16, 25, 36, ?',
    options: ['49', '48', '50', '64'],
    correctAnswerIndex: 0,
    explanation: 'The pattern is squares of consecutive integers: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49.',
  },
  {
    id: 'apt_l2',
    category: 'Logical',
    topic: 'Coding-Decoding',
    difficulty: 'Medium',
    question: "If in a certain code 'APPLE' is written as 'ELPPA', how is 'ORANGE' written in that code?",
    options: ['EGNARO', 'EGNRAO', 'ORAGNE', 'ENGARO'],
    correctAnswerIndex: 0,
    explanation: 'The word is reversed in character order: ORANGE reversed becomes EGNARO.',
  },
  {
    id: 'apt_l3',
    category: 'Logical',
    topic: 'Blood Relations',
    difficulty: 'Medium',
    question: "Pointing to a photograph, Ramesh said, 'She is the daughter of the only son of my grandfather.' How is the girl related to Ramesh?",
    options: ['Sister', 'Mother', 'Aunt', 'Cousin'],
    correctAnswerIndex: 0,
    explanation: "Ramesh's grandfather's only son is Ramesh's father. The daughter of Ramesh's father is Ramesh's sister.",
  },
  {
    id: 'apt_l4',
    category: 'Logical',
    topic: 'Directions',
    difficulty: 'Easy',
    question: 'A man walks 5 km North, then turns right and walks 3 km, then turns right again and walks 5 km. How far is he from his starting point?',
    options: ['3 km', '5 km', '8 km', '0 km'],
    correctAnswerIndex: 0,
    explanation: 'The North and South movements of 5 km cancel out, leaving him 3 km East of his starting position.',
  },
  // Verbal
  {
    id: 'apt_v1',
    category: 'Verbal',
    topic: 'Vocabulary',
    difficulty: 'Easy',
    question: "Select the synonym of 'CANDID':",
    options: ['Frank & Honest', 'Deceitful', 'Hesitant', 'Secretive'],
    correctAnswerIndex: 0,
    explanation: "'Candid' means truthful and straightforward; frank.",
  },
  {
    id: 'apt_v2',
    category: 'Verbal',
    topic: 'Sentence Correction',
    difficulty: 'Medium',
    question: 'Choose the grammatically correct sentence:',
    options: [
      'Neither the manager nor the employees were present.',
      'Neither the manager nor the employees was present.',
      'Neither the manager or the employees was present.',
      'Neither the manager or the employees were present.',
    ],
    correctAnswerIndex: 0,
    explanation: "When subjects are connected by 'neither... nor', the verb agrees with the closer subject ('employees', which is plural, hence 'were').",
  },
  {
    id: 'apt_v3',
    category: 'Verbal',
    topic: 'Analogies',
    difficulty: 'Easy',
    question: 'Architect : Blueprint :: Author : ?',
    options: ['Manuscript', 'Novel', 'Pen', 'Publishing House'],
    correctAnswerIndex: 0,
    explanation: 'An architect drafts a blueprint before construction, just as an author drafts a manuscript before publication.',
  },
];

export const codingProblemsBank: CodingProblem[] = [
  {
    id: 'code_p1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    acceptanceRate: '51.8%',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Use a hash map to achieve O(n) time complexity
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) {
                return {mp[complement], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
    },
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { input: '[3,3], 6', expectedOutput: '[0,1]' },
    ],
    hints: [
      'Can you solve it in a single pass using a Hash Map?',
      'Store each visited number and its index in the map.',
      'For each number, check if (target - num) has already been seen.',
    ],
    solutionExplanation:
      'Using a Hash Map gives O(N) time complexity and O(N) space complexity by mapping value -> index in a single pass.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 'code_p2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks & Queues',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptanceRate: '41.2%',
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only ()[]{}'],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
    },
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"([)]"', expectedOutput: 'false' },
    ],
    hints: [
      'Use a stack to keep track of opening brackets.',
      'When you see a closing bracket, check if it matches the top of the stack.',
    ],
    solutionExplanation:
      'A stack maintains LIFO order matching inner pairs before outer pairs. O(N) time and O(N) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  },
  {
    id: 'code_p3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    companyTags: ['Google', 'Meta', 'Apple', 'Adobe'],
    acceptanceRate: '34.5%',
    description:
      'Given a string `s`, find the length of the longest substring without duplicate characters.',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' },
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (seen.has(char) && seen.get(char) >= left) {
      left = seen.get(char) + 1;
    }
    seen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    max_len = 0
    left = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' },
      { input: '"pwwkew"', expectedOutput: '3' },
    ],
    hints: [
      'Maintain a sliding window [left, right] of unique characters.',
      'If right sees a repeat inside current window, jump left past the previous occurrence.',
    ],
    solutionExplanation:
      'Sliding window with character index map allows finding the max substring in single pass O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(M, N))',
  },
  {
    id: 'code_p4',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Two Pointers',
    companyTags: ['Amazon', 'Google', 'Apple'],
    acceptanceRate: '54.2%',
    description:
      'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No transactions are done and max profit = 0.' },
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
}`,
      python: `def max_profit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
    },
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
      { input: '[7,6,4,3,1]', expectedOutput: '0' },
    ],
    hints: ['Track the lowest price seen so far and the max profit possible today.'],
    solutionExplanation: 'Greedy tracking of min buy price guarantees optimal sell day in O(N) time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
  },
];

export const sampleLeaderboardUsers: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Raj Kumar',
    batch: '2024',
    overallScore: '9.8/10',
    college: 'IIT Kharagpur',
    codingPoints: 2450,
    aptitudePoints: 1980,
    badges: ['👑 Top Ranked', '🔥 50-day Streak', '💻 DSA Master'],
  },
  {
    rank: 2,
    name: 'Priya Singh',
    batch: '2024',
    overallScore: '9.6/10',
    college: 'NIT Trichy',
    codingPoints: 2380,
    aptitudePoints: 1950,
    badges: ['🥈 Runner Up', '🧠 Aptitude Ace'],
  },
  {
    rank: 3,
    name: 'Arjun Patel',
    batch: '2024',
    overallScore: '9.4/10',
    college: 'BITS Pilani',
    codingPoints: 2310,
    aptitudePoints: 1890,
    badges: ['🥉 Bronze Prodigy', '🚀 Rapid Solver'],
  },
  {
    rank: 4,
    name: 'Chandana',
    batch: '2025',
    overallScore: '9.2/10',
    college: 'GCEK Kalahandi',
    codingPoints: 2190,
    aptitudePoints: 1840,
    badges: ['⭐ Star Achiever', '⚡ 14-day Streak'],
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: 'Isha Sharma',
    batch: '2024',
    overallScore: '9.2/10',
    college: 'Delhi Technological University',
    codingPoints: 2180,
    aptitudePoints: 1830,
    badges: ['⭐ High Performer'],
  },
  {
    rank: 6,
    name: 'Rohan Gupta',
    batch: '2024',
    overallScore: '9.1/10',
    college: 'Vellore Institute of Technology',
    codingPoints: 2090,
    aptitudePoints: 1790,
    badges: ['🎯 Target Hitter'],
  },
  {
    rank: 7,
    name: 'Sneha Desai',
    batch: '2024',
    overallScore: '9.0/10',
    college: 'RV College of Engineering',
    codingPoints: 2010,
    aptitudePoints: 1740,
    badges: ['✨ Rising Star'],
  },
  {
    rank: 8,
    name: 'Vikram Singh',
    batch: '2023',
    overallScore: '8.9/10',
    college: 'Thapar University',
    codingPoints: 1950,
    aptitudePoints: 1700,
    badges: ['🛡️ Consistent'],
  },
  {
    rank: 9,
    name: 'Anjali Verma',
    batch: '2023',
    overallScore: '8.8/10',
    college: 'Jadavpur University',
    codingPoints: 1890,
    aptitudePoints: 1670,
    badges: ['💡 Problem Solver'],
  },
  {
    rank: 10,
    name: 'Nikhil Patel',
    batch: '2024',
    overallScore: '8.7/10',
    college: 'MIT Manipal',
    codingPoints: 1820,
    aptitudePoints: 1640,
    badges: ['⚡ Fast Coder'],
  },
];

export const defaultRoadmapSteps: RoadmapStep[] = [
  {
    id: 'step_1',
    week: 1,
    title: 'Core JS & Foundations',
    topic: 'Closures, Event Loop, Promises, ES6+',
    status: 'completed',
    description: 'Establish firm mastery over JavaScript runtime semantics, closures, prototype chain, and asynchronous execution.',
    tasks: [
      { title: 'Practice 10 Quiz Questions on Closures & Scopes', type: 'aptitude', completed: true },
      { title: 'Implement custom Promise.all() polyfill', type: 'coding', completed: true },
      { title: 'Review V8 Engine Event Loop architecture', type: 'reading', completed: true },
    ],
  },
  {
    id: 'step_2',
    week: 2,
    title: 'Data Structures - Arrays & HashMaps',
    topic: 'Two Pointers, Sliding Window, Prefix Sums',
    status: 'completed',
    description: 'Solve the most common placement interview patterns tested by top tech companies.',
    tasks: [
      { title: 'Solve Two Sum & 3Sum', type: 'coding', completed: true },
      { title: 'Solve Longest Substring Without Repeating Characters', type: 'coding', completed: true },
      { title: 'Timed Quantitative Test on Time & Work', type: 'aptitude', completed: true },
    ],
  },
  {
    id: 'step_3',
    week: 3,
    title: 'Full-Stack Architecture & REST APIs',
    topic: 'Express.js, JWT Authentication, MongoDB Schemas',
    status: 'in-progress',
    description: 'Build production-ready secure auth flows, rate limiting, and clean relational/document data models.',
    tasks: [
      { title: 'Implement Refresh Token rotation with JWT', type: 'project', completed: true },
      { title: 'Address MERN skill gap: indexing & query optimization', type: 'coding', completed: false },
      { title: 'Conduct AI Mock Interview on RESTful principles', type: 'aptitude', completed: false },
    ],
  },
  {
    id: 'step_4',
    week: 4,
    title: 'Advanced DSA - Trees & Graphs',
    topic: 'BFS, DFS, Binary Search Trees, Dijkstra',
    status: 'upcoming',
    description: 'Master hierarchical structures, topological sorting, and shortest path algorithms.',
    tasks: [
      { title: 'Level Order Traversal and Lowest Common Ancestor', type: 'coding', completed: false },
      { title: 'Number of Connected Islands in Grid', type: 'coding', completed: false },
    ],
  },
  {
    id: 'step_5',
    week: 5,
    title: 'Placement Readiness & Mock Drills',
    topic: 'System Design basics, ATS Resume Polish, HR Rounds',
    status: 'upcoming',
    description: 'Synthesize your preparation for campus placements and off-campus dream drives.',
    tasks: [
      { title: 'Run Resume through ATS Analyzer for SDE role', type: 'reading', completed: false },
      { title: 'Complete full 45-min AI Technical Mock Interview', type: 'aptitude', completed: false },
    ],
  },
];
