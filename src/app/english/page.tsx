"use client";

import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// 沈睿祈 - 高一英语期中考试 - 从批改答题卡提取的真实数据
const examData = {
  studentName: "沈睿祈",
  examTitle: "雅礼教育集团2025年下学期高一期中考试",
  subject: "英语",
  totalScore: 150,
  studentScore: 100.5,
  examDate: "2025-11",
  grade: "高一",

  // 各大题得分情况
  sections: [
    {
      id: 1,
      name: "听力",
      fullScore: 30,
      studentScore: 24,
      questionRange: "1-20",
      scorePerQuestion: 1.5,
      details: "共20小题，每小题1.5分"
    },
    {
      id: 2,
      name: "阅读理解",
      fullScore: 50,
      studentScore: 47.5,
      questionRange: "21-40",
      details: "第一节21-35每小题2.5分(37.5分)，第二节36-40每小题2.5分(12.5分)"
    },
    {
      id: 3,
      name: "完形填空",
      fullScore: 15,
      studentScore: 6,
      questionRange: "41-55",
      scorePerQuestion: 1,
      details: "共15小题，每小题1分"
    },
    {
      id: 4,
      name: "语法填空",
      fullScore: 15,
      studentScore: 9,
      questionRange: "56-70",
      details: "第一节56-65每小题1分(10分)，第二节66-70每小题1分(5分)"
    },
    {
      id: 5,
      name: "应用文写作",
      fullScore: 15,
      studentScore: 11,
      questionRange: "第一节",
      details: "推荐信，约80词"
    },
    {
      id: 6,
      name: "读后续写",
      fullScore: 25,
      studentScore: 3,
      questionRange: "第二节",
      details: "续写两段，约150词"
    }
  ],

  // 详细错题记录
  questions: [
    // 听力部分 (24/30分，错4题)
    { id: 1, section: "听力", knowledgePoint: "短对话理解", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 2, section: "听力", knowledgePoint: "人物关系判断", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 3, section: "听力", knowledgePoint: "情感态度推断", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 4, section: "听力", knowledgePoint: "请求建议理解", maxScore: 1.5, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "B", errorType: "细节理解",
      detailedAnalysis: {
        questionFocus: "听力细节题：捕捉对话中的具体请求或建议",
        correctReasoning: [
          "1. 题目问：What does Roberts ask the woman to do?",
          "2. 关键信息：需要听Roberts说的话，特别是祈使句或请求句",
          "3. 选项分析：A.Finish homework B.Read that part again C.Go back home",
          "4. 正确答案B：Roberts请求对方'Read that part again'（再读一遍那部分）"
        ],
        studentMistake: "选A的错误：可能混淆了对话中提到的其他内容。听力中'请求/建议'题要特别关注please, could you, would you, why don't you等引导的句子",
        similarPattern: "请求建议题解题技巧：①预读选项，明确要听什么 ②关注祈使句和情态动词 ③注意but/however后的转折",
        tips: "听力技巧：请求类题目的答案通常在对话后半段，注意动词原形开头的祈使句"
      }
    },
    { id: 5, section: "听力", knowledgePoint: "时间信息", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 6, section: "听力", knowledgePoint: "长对话-主题", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 7, section: "听力", knowledgePoint: "长对话-细节", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 8, section: "听力", knowledgePoint: "长对话-目的", maxScore: 1.5, studentScore: 0, isCorrect: false, studentAnswer: "B", correctAnswer: "C", errorType: "推断失误",
      detailedAnalysis: {
        questionFocus: "听力推断题：判断说话人的真实目的或意图",
        correctReasoning: [
          "1. 题目问：Why does the man call the woman?（男士打电话的目的）",
          "2. 选项分析：A.To ask the woman's decision B.To persuade her to sell C.To invite her to see the apartment",
          "3. 关键判断：要区分'目的'和'过程中发生的事'",
          "4. 正确答案C：男士打电话的最终目的是邀请女士看房"
        ],
        studentMistake: "选B的错误：混淆了'目的'和'对话内容'。男士可能在对话中有说服的行为，但打电话的初始目的是邀请看房",
        similarPattern: "目的题解题技巧：①听对话开头，通常会说明来电原因 ②区分'目的'vs'过程'vs'结果' ③Why类问题关注because, since, in order to",
        tips: "记忆：目的题答案通常在对话开始时出现，'I'm calling to...' / 'The reason I called is...'"
      }
    },
    { id: 9, section: "听力", knowledgePoint: "描述理解", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 10, section: "听力", knowledgePoint: "行为预测", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 11, section: "听力", knowledgePoint: "原因分析", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 12, section: "听力", knowledgePoint: "时间信息", maxScore: 1.5, studentScore: 0, isCorrect: false, studentAnswer: "B", correctAnswer: "A", errorType: "细节理解",
      detailedAnalysis: {
        questionFocus: "听力细节题：准确捕捉时间信息",
        correctReasoning: [
          "1. 题目问：When did Daisy meet Ketty for the first time?",
          "2. 选项分析：A.A week ago B.A month ago C.A year ago",
          "3. 关键：听力中时间词容易混淆，需要精准捕捉",
          "4. 正确答案A：Daisy第一次见Ketty是'a week ago'（一周前）"
        ],
        studentMistake: "选B(A month ago)的错误：时间信息听错或记混。听力中week/month/year发音相似，需要特别专注",
        similarPattern: "时间题解题技巧：①预读选项中的时间词 ②听到时间立即记录 ③注意ago/before/later的区别",
        tips: "易混时间词对比：a week ago(一周前) vs a month ago(一个月前) vs a year ago(一年前)"
      }
    },
    { id: 13, section: "听力", knowledgePoint: "人物身份", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 14, section: "听力", knowledgePoint: "活动内容", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 15, section: "听力", knowledgePoint: "推荐理由", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 16, section: "听力", knowledgePoint: "场所特征", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 17, section: "听力", knowledgePoint: "独白-事实", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 18, section: "听力", knowledgePoint: "独白-原因", maxScore: 1.5, studentScore: 0, isCorrect: false, studentAnswer: "C", correctAnswer: "A", errorType: "推断失误",
      detailedAnalysis: {
        questionFocus: "听力推断题：理解独白中的因果关系",
        correctReasoning: [
          "1. 题目问：Why is it cruel to keep a rabbit on its own?（为什么单独养兔子是残忍的）",
          "2. 选项分析：A.Rabbits are social creatures B.Rabbits need to work together C.Rabbits won't eat food",
          "3. 关键词：social creatures（群居动物）",
          "4. 正确答案A：因为兔子是social creatures（群居动物），单独养会让它们孤独"
        ],
        studentMistake: "选C的错误：对'social creatures'理解不够。这个词表示兔子是群居动物，需要同伴，而不是关于吃食物的问题",
        similarPattern: "原因题解题技巧：①关注because, since, as, for引导的原因状语 ②独白中原因通常紧跟问题之后 ③理解专业词汇的含义",
        tips: "词汇积累：social creatures/animals = 群居动物，需要同伴陪伴"
      }
    },
    { id: 19, section: "听力", knowledgePoint: "独白-建议", maxScore: 1.5, studentScore: 1.5, isCorrect: true },
    { id: 20, section: "听力", knowledgePoint: "独白-来源", maxScore: 1.5, studentScore: 1.5, isCorrect: true },

    // 阅读理解 (47.5/50分，错1题)
    { id: 21, section: "阅读理解", knowledgePoint: "细节理解-A篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Cold Truths-饮食习惯" },
    { id: 22, section: "阅读理解", knowledgePoint: "细节理解-A篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Cold Truths-饮食习惯" },
    { id: 23, section: "阅读理解", knowledgePoint: "文章来源推断", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Cold Truths-饮食习惯" },
    { id: 24, section: "阅读理解", knowledgePoint: "主旨大意-B篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Brooklyn书店" },
    { id: 25, section: "阅读理解", knowledgePoint: "词义猜测", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Brooklyn书店", word: "death knell" },
    { id: 26, section: "阅读理解", knowledgePoint: "细节理解-B篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Brooklyn书店" },
    { id: 27, section: "阅读理解", knowledgePoint: "主旨大意-B篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "Brooklyn书店" },
    { id: 28, section: "阅读理解", knowledgePoint: "细节理解-C篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "鸟类睡眠" },
    { id: 29, section: "阅读理解", knowledgePoint: "细节理解-C篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "鸟类睡眠" },
    { id: 30, section: "阅读理解", knowledgePoint: "推理判断-C篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "鸟类睡眠" },
    { id: 31, section: "阅读理解", knowledgePoint: "标题选择-C篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "鸟类睡眠" },
    { id: 32, section: "阅读理解", knowledgePoint: "细节理解-D篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "AI艺术" },
    { id: 33, section: "阅读理解", knowledgePoint: "写作意图-D篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "AI艺术" },
    { id: 34, section: "阅读理解", knowledgePoint: "推理判断-D篇", maxScore: 2.5, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "C", errorType: "推断失误", passage: "AI艺术",
      detailedAnalysis: {
        questionFocus: "阅读推理判断题：从段落信息推断隐含结论",
        correctReasoning: [
          "1. 题目问：What can we learn from paragraph 4?（从第四段能得出什么）",
          "2. 定位第四段：讨论AI艺术对艺术行业的影响",
          "3. 关键句：'AI uses computing power to look through huge amounts of data...the main difference is that AI follows orders instead of having a strong feeling to express itself'",
          "4. 选项分析：A.AI art helps sell more products B.Artists can create more works C.The art industry will have tough competition D.AI art makes copyright harder",
          "5. 推理：AI能大量快速创作 + 人类艺术家需要投入时间精力 = 行业竞争加剧",
          "6. 正确答案C：The art industry will have tough competition"
        ],
        studentMistake: "选A的错误：A选项'AI art helps sell more artistic products'在第四段没有提及，属于无中生有。原文讨论的是AI创作方式与人类的差异，暗示竞争，而非销售",
        similarPattern: "推理判断题陷阱：①无中生有（原文没说）②过度推断（说得太绝对）③张冠李戴（混淆段落）④正反混淆（态度相反）",
        tips: "推理题原则：答案要有原文依据支撑，不能凭主观臆断。正确选项往往是原文信息的'合理延伸'而非'直接复述'"
      }
    },
    { id: 35, section: "阅读理解", knowledgePoint: "主旨大意-D篇", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "AI艺术" },
    { id: 36, section: "阅读理解", knowledgePoint: "七选五-逻辑", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "友谊的艺术" },
    { id: 37, section: "阅读理解", knowledgePoint: "七选五-衔接", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "友谊的艺术" },
    { id: 38, section: "阅读理解", knowledgePoint: "七选五-主题", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "友谊的艺术" },
    { id: 39, section: "阅读理解", knowledgePoint: "七选五-过渡", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "友谊的艺术" },
    { id: 40, section: "阅读理解", knowledgePoint: "七选五-总结", maxScore: 2.5, studentScore: 2.5, isCorrect: true, passage: "友谊的艺术" },

    // 完形填空 (6/15分，错9题) - 高中同学聚会主题
    { id: 41, section: "完形填空", knowledgePoint: "形容词辨析", maxScore: 1, studentScore: 1, isCorrect: true, context: "faces brought me back" },
    { id: 42, section: "完形填空", knowledgePoint: "动词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "B", errorType: "词汇辨析", context: "best way to ___ reunion",
      detailedAnalysis: {
        questionFocus: "动词辨析：celebrate vs describe vs organize",
        correctReasoning: [
          "1. 理解语境：文章描述20年后的高中同学聚会，作者在回忆最好的方式来___这次聚会",
          "2. 分析选项：A. celebrate(庆祝) B. describe(描述) C. organize(组织) D. mark(标记)",
          "3. 关键判断：这里需要一个表示'描述、讲述'的动词，因为作者接下来要描述聚会的场景",
          "4. 正确答案B：describe the reunion = 描述这次聚会，符合文章叙述视角"
        ],
        studentMistake: "选A (celebrate)的错误在于：celebrate强调'庆祝'的动作，但这里作者是在'描述/讲述'聚会经历，不是在庆祝",
        similarPattern: "类似考点：动词的语境匹配。做题时要看前后文的逻辑关系，判断需要什么语义的动词",
        tips: "记忆：describe偏重'描述、叙述'，celebrate偏重'庆祝（节日、胜利）'"
      }
    },
    { id: 43, section: "完形填空", knowledgePoint: "形容词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "B", correctAnswer: "A", errorType: "词汇辨析", context: "___ and excited",
      detailedAnalysis: {
        questionFocus: "形容词辨析：情感词的搭配",
        correctReasoning: [
          "1. 理解语境：作者描述见到老同学时的心情，'___ and excited'",
          "2. 分析选项：A. Calm(平静) B. Confident(自信) C. Nervous(紧张) D. Proud(骄傲)",
          "3. 关键判断：and连接的两个词通常是并列或递进关系",
          "4. Nervous和excited都是描述见面时的激动情绪，形成'紧张又兴奋'的合理搭配",
          "5. 正确答案C：Nervous and excited = 紧张又兴奋（见老朋友的典型心情）"
        ],
        studentMistake: "选B (Confident)的错误：Confident(自信)与excited不是常见的情感搭配，且不符合重逢场景的心理状态",
        similarPattern: "情感形容词常见搭配：nervous and excited / surprised and delighted / sad and disappointed",
        tips: "技巧：并列连词and连接的形容词往往在感情色彩或程度上相近"
      }
    },
    { id: 44, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "D", errorType: "语境理解", context: "recognized many ___",
      detailedAnalysis: {
        questionFocus: "名词辨析：根据场景选择合适人物",
        correctReasoning: [
          "1. 理解语境：在高中同学聚会(reunion)上，作者认出了很多___",
          "2. 分析选项：A. neighbors(邻居) B. leaders(领导) C. teachers(老师) D. classmates(同学)",
          "3. 关键线索：这是一个school reunion(同学聚会)",
          "4. 逻辑判断：在同学聚会上认出的自然是classmates(同学)",
          "5. 正确答案D：recognized many classmates = 认出了很多同学"
        ],
        studentMistake: "选A (neighbors)的错误：场景是同学聚会，不是邻里聚会。neighbors在此语境下完全不合逻辑",
        similarPattern: "场景匹配题：一定要抓住文章的主题和场景，选择符合情境的词汇",
        tips: "做完形时，先把握文章大意，明确'谁在哪里做什么'，再逐题分析"
      }
    },
    { id: 45, section: "完形填空", knowledgePoint: "动词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "C", correctAnswer: "A", errorType: "词汇辨析", context: "No one seemed to ___",
      detailedAnalysis: {
        questionFocus: "动词辨析：hesitate的用法",
        correctReasoning: [
          "1. 理解语境：见面时，'No one seemed to ___'（没有人似乎___）",
          "2. 后文暗示：大家很快就热络起来，没有尴尬",
          "3. 分析选项：A. hesitated(犹豫) B. improved(改善) C. worried(担心) D. aged(变老)",
          "4. 逻辑判断：重逢时'没有人犹豫'意味着大家很自然地聊起来",
          "5. 正确答案A：No one seemed to hesitate = 没有人显得犹豫"
        ],
        studentMistake: "选C (worried)的错误：worry强调'担心某事'，需要担心的对象；hesitate强调'迟疑、犹豫'的短暂状态，更符合重逢场景",
        similarPattern: "hesitate常用于：hesitate to do sth(犹豫做某事) / without hesitation(毫不犹豫)",
        tips: "hesitate vs worry：hesitate是短暂的迟疑状态，worry是持续的担忧情绪"
      }
    },
    { id: 46, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 1, isCorrect: true, context: "time full of ___" },
    { id: 47, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "B", errorType: "语境理解", context: "plenty of stress and ___",
      detailedAnalysis: {
        questionFocus: "名词辨析：与stress并列的词",
        correctReasoning: [
          "1. 理解语境：高中是充满'stress and ___'的时期",
          "2. 分析选项：A. adventures(冒险) B. expectations(期望) C. disagreements(分歧) D. distractions(分心)",
          "3. 关键判断：stress(压力)和___应该是并列关系，都是高中生面临的负担",
          "4. 逻辑分析：expectations(来自家长、老师、社会的期望)是高中生压力的主要来源",
          "5. 正确答案B：stress and expectations = 压力和期望（高中生的典型困境）"
        ],
        studentMistake: "选A (adventures)的错误：adventures(冒险/奇遇)是正面词汇，与stress的负面情感不搭配",
        similarPattern: "并列词汇的感情色彩要一致：正面+正面 或 负面+负面",
        tips: "高中生活常见搭配：stress/pressure/expectations/challenges"
      }
    },
    { id: 48, section: "完形填空", knowledgePoint: "动词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "B", correctAnswer: "C", errorType: "语境理解", context: "none of that ___",
      detailedAnalysis: {
        questionFocus: "动词辨析：matter的用法",
        correctReasoning: [
          "1. 理解语境：'In the end, none of that ___'（最终，那些都不___）",
          "2. 后文提示：'what truly counts is the friendship'（真正重要的是友谊）",
          "3. 分析选项：A. appears(出现) B. fails(失败) C. matters(重要) D. ends(结束)",
          "4. 逻辑判断：与'what truly counts'形成对比，前面应该是'不重要'",
          "5. 正确答案C：none of that matters = 那些都不重要"
        ],
        studentMistake: "选B (fails)的错误：fail表示'失败'，none of that fails意思不通；matter表示'有关系、重要'",
        similarPattern: "常见句型：It doesn't matter. / Nothing matters more than... / What matters is...",
        tips: "matter作动词 = be important；It matters = 这很重要"
      }
    },
    { id: 49, section: "完形填空", knowledgePoint: "动词辨析", maxScore: 1, studentScore: 1, isCorrect: true, context: "isn't ___ by the car" },
    { id: 50, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 1, isCorrect: true, context: "what holds real ___" },
    { id: 51, section: "完形填空", knowledgePoint: "副词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "B", errorType: "词汇辨析", context: "Success means living ___",
      detailedAnalysis: {
        questionFocus: "副词辨析：与living搭配的副词",
        correctReasoning: [
          "1. 理解语境：'Success means living ___'（成功意味着___地生活）",
          "2. 分析选项：A. quietly(安静地) B. comfortably(舒适地) C. bravely(勇敢地) D. fully(充分地)",
          "3. 上下文：文章在讨论成功的真正含义，强调幸福和人际关系",
          "4. 逻辑判断：comfortably(舒适地)最能体现'成功带来的生活状态'",
          "5. 正确答案B：living comfortably = 生活舒适"
        ],
        studentMistake: "选A (quietly)的错误：quietly强调'安静、低调'，与成功的讨论语境不太匹配；comfortably更强调生活质量",
        similarPattern: "live + 副词搭配：live happily/comfortably/peacefully/independently",
        tips: "comfortably常用于描述生活状态：live comfortably = 生活舒适/宽裕"
      }
    },
    { id: 52, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "B", correctAnswer: "C", errorType: "语境理解", context: "look at this ___",
      detailedAnalysis: {
        questionFocus: "名词辨析：circle of friends固定搭配",
        correctReasoning: [
          "1. 理解语境：作者看着照片，看到'this ___ of friends'",
          "2. 分析选项：A. team(团队) B. unit(单位) C. circle(圈子) D. crowd(人群)",
          "3. 关键判断：'___ of friends'需要一个与朋友群体搭配的名词",
          "4. 固定搭配：circle of friends = 朋友圈/朋友圈子",
          "5. 正确答案C：this circle of friends = 这个朋友圈子"
        ],
        studentMistake: "选B (unit)的错误：unit(单位、单元)不与friends搭配；circle of friends是固定表达",
        similarPattern: "常见搭配：circle of friends / social circle / inner circle / family circle",
        tips: "记忆：circle可以表示'圈子'，circle of friends = 朋友圈"
      }
    },
    { id: 53, section: "完形填空", knowledgePoint: "动词短语", maxScore: 1, studentScore: 1, isCorrect: true, context: "___ where you left off" },
    { id: 54, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "A", correctAnswer: "B", errorType: "词汇搭配", context: "___ formed in those years",
      detailedAnalysis: {
        questionFocus: "名词辨析：bonds的含义和用法",
        correctReasoning: [
          "1. 理解语境：'the ___ formed in those years'（那些年形成的___）",
          "2. 分析选项：A. habits(习惯) B. bonds(纽带) C. promises(承诺) D. dreams(梦想)",
          "3. 关键判断：文章讨论的是友谊，什么能在高中'形成'并持续多年？",
          "4. 语义分析：bonds(纽带、联系)常用于描述人与人之间深厚的情感联系",
          "5. 正确答案B：bonds formed = 形成的纽带/情谊"
        ],
        studentMistake: "选A (habits)的错误：habits(习惯)不能用formed，且与友谊主题不符；bonds专门用于描述人际情感联系",
        similarPattern: "bond相关搭配：form bonds / strengthen bonds / family bonds / emotional bonds",
        tips: "bond作名词 = 纽带、联系；常用于亲情、友情等深厚关系"
      }
    },
    { id: 55, section: "完形填空", knowledgePoint: "名词辨析", maxScore: 1, studentScore: 1, isCorrect: true, context: "see where ___ takes us" },

    // 语法填空 (9/15分)
    { id: 56, section: "语法填空", knowledgePoint: "不定式", maxScore: 1, studentScore: 1, isCorrect: true, answer: "to mark", context: "was held ___ (mark) the anniversary" },
    { id: 57, section: "语法填空", knowledgePoint: "现在分词", maxScore: 1, studentScore: 1, isCorrect: true, answer: "reflecting", context: "___ (reflect) historical strength" },
    { id: 58, section: "语法填空", knowledgePoint: "动词时态", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "fly", correctAnswer: "flew", errorType: "语法错误", context: "The aircraft ___ (fly) over",
      detailedAnalysis: {
        questionFocus: "动词时态：一般过去时",
        correctReasoning: [
          "1. 找时间标志：文章描述的是已经发生的阅兵活动",
          "2. 判断时态：描述过去发生的事实，用一般过去时",
          "3. 动词变形：fly → flew（不规则变化）",
          "4. 正确答案：flew"
        ],
        studentMistake: "填fly(原形)的错误：没有注意到这是叙述过去事件，需要用过去时flew",
        similarPattern: "不规则动词过去式：fly-flew / take-took / see-saw / go-went",
        tips: "做语法填空时，先判断时态（看时间状语），再确定语态（主动/被动），最后变形"
      }
    },
    { id: 59, section: "语法填空", knowledgePoint: "代词/定语从句", maxScore: 1, studentScore: 1, isCorrect: true, answer: "which", context: "J-20S, ___ is the world's only" },
    { id: 60, section: "语法填空", knowledgePoint: "副词", maxScore: 1, studentScore: 1, isCorrect: true, answer: "publicly", context: "was shown ___ (public)" },
    { id: 61, section: "语法填空", knowledgePoint: "现在分词", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "feature", correctAnswer: "featuring", errorType: "语法错误", context: "capabilities are impressive, ___ (feature) technology",
      detailedAnalysis: {
        questionFocus: "非谓语动词：现在分词作定语",
        correctReasoning: [
          "1. 分析句子结构：'capabilities are truly impressive, ___ (feature) state-of-the-art technology'",
          "2. 判断成分：主句已有谓语are，feature需要变成非谓语形式",
          "3. 判断关系：capabilities与feature是主动关系（性能'具有'技术）",
          "4. 选择形式：主动关系用现在分词 -ing",
          "5. 正确答案：featuring"
        ],
        studentMistake: "填feature(原形)的错误：句子已有谓语动词are，不能再加一个谓语动词；需要用非谓语形式",
        similarPattern: "非谓语选择：主动用-ing，被动用-ed；The book written by him / The man standing there",
        tips: "判断非谓语的步骤：①确认句子已有谓语 ②判断主动/被动关系 ③选择-ing或-ed"
      }
    },
    { id: 62, section: "语法填空", knowledgePoint: "现在完成时", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "make", correctAnswer: "have made", errorType: "语法错误", context: "armed forces ___ (make) progress",
      detailedAnalysis: {
        questionFocus: "动词时态：现在完成时",
        correctReasoning: [
          "1. 找时间标志：'in recent years'（近年来）",
          "2. 判断时态：in recent years是现在完成时的典型标志词",
          "3. 确定主语：armed forces（复数）",
          "4. 动词变形：have + 过去分词 = have made",
          "5. 正确答案：have made"
        ],
        studentMistake: "填make(原形)的错误：忽略了时间标志词in recent years，该词组要求用现在完成时",
        similarPattern: "现在完成时标志词：in recent years / so far / up to now / since... / for...",
        tips: "看到in recent years, so far, up to now等，立刻想到现在完成时have/has + done"
      }
    },
    { id: 63, section: "语法填空", knowledgePoint: "冠词", maxScore: 1, studentScore: 1, isCorrect: true, answer: "a", context: "represent ___ great step forward" },
    { id: 64, section: "语法填空", knowledgePoint: "代词/连词", maxScore: 1, studentScore: 1, isCorrect: true, answer: "and", context: "___ their appearance aims" },
    { id: 65, section: "语法填空", knowledgePoint: "形容词", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "region", correctAnswer: "regional", errorType: "词性转换", context: "___ (region) peace and stability",
      detailedAnalysis: {
        questionFocus: "词性转换：名词→形容词",
        correctReasoning: [
          "1. 分析位置：'___ (region) peace and stability'",
          "2. 判断词性：空格后是名词peace，空格处需要形容词来修饰",
          "3. 词性转换：region(n.地区) → regional(adj.地区的)",
          "4. 正确答案：regional peace = 地区和平"
        ],
        studentMistake: "填region(名词)的错误：名词不能直接修饰名词，需要转换成形容词regional",
        similarPattern: "常见-al后缀转换：region→regional / nation→national / tradition→traditional",
        tips: "形容词修饰名词！看到___+名词的结构，先判断是否需要形容词"
      }
    },
    { id: 66, section: "语法填空", knowledgePoint: "固定搭配", maxScore: 1, studentScore: 1, isCorrect: true, answer: "gave up/abandoned", context: "hurt and ___ (放弃) our friendship" },
    { id: 67, section: "语法填空", knowledgePoint: "副词", maxScore: 1, studentScore: 1, isCorrect: true, answer: "equally", context: "want your friend to value it ___ (equal)" },
    { id: 68, section: "语法填空", knowledgePoint: "形容词比较级", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "satisfy", correctAnswer: "more satisfied", errorType: "语法错误", context: "become happier, wiser and more ___ (satisfy)",
      detailedAnalysis: {
        questionFocus: "形容词比较级：并列结构",
        correctReasoning: [
          "1. 分析结构：'become happier, wiser and more ___ (satisfy)'",
          "2. 识别并列：happier, wiser, more___三个词并列，都是比较级",
          "3. 词性转换：satisfy(v.) → satisfied(adj.)",
          "4. 构成比较级：satisfied是多音节词，比较级是more satisfied",
          "5. 正确答案：more satisfied"
        ],
        studentMistake: "填satisfy(动词原形)的错误：①become后需要形容词不是动词 ②需要与happier, wiser保持并列的比较级形式",
        similarPattern: "多音节形容词比较级：more important / more beautiful / more satisfied",
        tips: "并列结构要保持一致！看到A, B and C结构，三者词性和形式要统一"
      }
    },
    { id: 69, section: "语法填空", knowledgePoint: "名词", maxScore: 1, studentScore: 1, isCorrect: true, answer: "failure(s)", context: "sharing joy, sadness, success and ___ (fail)" },
    { id: 70, section: "语法填空", knowledgePoint: "固定搭配", maxScore: 1, studentScore: 0, isCorrect: false, studentAnswer: "come from", correctAnswer: "comes from", errorType: "主谓一致", context: "this kind of openness ___ (源于) a close friendship",
      detailedAnalysis: {
        questionFocus: "主谓一致：this kind of + 名词",
        correctReasoning: [
          "1. 找主语：'this kind of openness'",
          "2. 判断单复数：this kind of...作主语时，谓语动词与kind一致，用单数",
          "3. 翻译提示：'源于' = come from",
          "4. 动词变形：come → comes（第三人称单数）",
          "5. 正确答案：comes from"
        ],
        studentMistake: "填come from的错误：忽略了主语是this kind of...，需要用第三人称单数comes",
        similarPattern: "this kind/type/sort of + 名词，谓语用单数；these kinds of + 名词，谓语用复数",
        tips: "主谓一致口诀：this kind of用单数，these kinds of用复数"
      }
    },

    // 写作第一节 - 应用文 (11/15分)
    { id: 71, section: "应用文写作", knowledgePoint: "格式规范", maxScore: 3, studentScore: 3, isCorrect: true, details: "书信格式正确，称呼结尾完整" },
    { id: 72, section: "应用文写作", knowledgePoint: "内容完整", maxScore: 5, studentScore: 4, isCorrect: false, errorType: "内容缺失", details: "基本信息+推荐理由",
      detailedAnalysis: {
        questionFocus: "应用文写作：推荐信的内容要点",
        correctReasoning: [
          "1. 题目要求：写推荐信，推荐'最美雅礼人'候选人",
          "2. 必须包含：(1)被推荐人基本信息 (2)推荐理由",
          "3. 推荐理由需要：具体事例 + 品质特点 + 为什么适合这个称号",
          "4. 高分要点：理由要有说服力，最好有2-3个不同角度的论据"
        ],
        studentMistake: "扣分原因：推荐理由不够充分。你写了'studies very well'和'helps classmates'，但缺少具体事例。比如：在什么情况下帮助同学？取得了什么具体成绩？",
        similarPattern: "推荐信高分模板：①开门见山说明推荐意图 ②分点列举2-3个推荐理由 ③每个理由配具体事例 ④总结呼应，表达期待",
        tips: "记住：空洞的形容词不如具体的事例有说服力。'He is helpful'不如'He spent two hours helping me with math problems last week'"
      }
    },
    { id: 73, section: "应用文写作", knowledgePoint: "语言表达", maxScore: 7, studentScore: 4, isCorrect: false, errorType: "语言错误", details: "语法、词汇、句式",
      detailedAnalysis: {
        questionFocus: "应用文写作：语言准确性和多样性",
        correctReasoning: [
          "1. 语法正确：时态一致、主谓一致、词性正确",
          "2. 词汇恰当：用词准确、搭配正确、避免中式英语",
          "3. 句式多样：简单句+复合句结合，避免全是短句",
          "4. 衔接流畅：使用连接词，段落过渡自然"
        ],
        studentMistake: "你的问题：①语法错误：'a grand great grade'重复用词 ②句式单一：大多是简单的主谓宾结构 ③表达生硬：缺少过渡词和高级句型",
        similarPattern: "语言提升技巧：①检查主谓一致 ②避免重复用词 ③尝试使用定语从句、非谓语 ④添加First/Moreover/In addition等连接词",
        tips: "写完后检查清单：①每句话主谓是否一致？②有没有拼写错误？③句式是否太单一？④是否有中式英语？"
      }
    },

    // 写作第二节 - 读后续写 (3/25分)
    { id: 74, section: "读后续写", knowledgePoint: "内容逻辑", maxScore: 10, studentScore: 1, isCorrect: false, errorType: "内容不完整", details: "故事延续性、情节发展",
      detailedAnalysis: {
        questionFocus: "读后续写：情节发展的逻辑性和完整性",
        correctReasoning: [
          "1. 读懂原文：小男孩想买跛脚小狗，店主说没人会要它",
          "2. 第一段开头：'The little boy got quite upset...' → 需要写男孩的反应和行动",
          "3. 第二段开头：'Deeply moved, the shop owner paused...' → 需要写店主被感动后的反应",
          "4. 情节逻辑：男孩揭示自己也有残疾 → 店主被感动 → 温暖结局",
          "5. 字数要求：约150词，两段各约75词"
        ],
        studentMistake: "严重问题：①第一段内容太单薄 ②第二段几乎空白 ③情节没有展开，缺少关键转折（男孩展示自己的腿）④没有达到字数要求",
        similarPattern: "续写情节设计：①紧扣开头句展开 ②设置1-2个小转折 ③人物情感要有变化 ④结尾呼应主题",
        tips: "续写万能结构：开头句→人物反应→关键动作→情感升华→温暖结局"
      }
    },
    { id: 75, section: "读后续写", knowledgePoint: "语言质量", maxScore: 10, studentScore: 1, isCorrect: false, errorType: "语言单薄", details: "词汇丰富度、句式多样性",
      detailedAnalysis: {
        questionFocus: "读后续写：语言的生动性和感染力",
        correctReasoning: [
          "1. 动作描写：用具体动词代替泛泛的said/went/looked",
          "2. 情感描写：通过外在表现展现内心情感",
          "3. 细节描写：添加环境、神态、动作细节",
          "4. 句式多样：长短句结合，使用非谓语、倒装等"
        ],
        studentMistake: "你的语言问题：①描写太平淡，缺少生动的动词和形容词 ②没有情感描写，读不出人物心情 ③句子太短太简单 ④没有使用高级句型和修辞",
        similarPattern: "语言提升示例：'He was sad' → 'Tears welled up in his eyes as disappointment washed over him'",
        tips: "续写高分语言积累：①情感动词：trembled, whispered, choked ②神态词：with determination in his eyes ③环境烘托：A warm feeling flooded through the room"
      }
    },
    { id: 76, section: "读后续写", knowledgePoint: "衔接连贯", maxScore: 5, studentScore: 1, isCorrect: false, errorType: "衔接不当", details: "段落开头衔接、整体连贯",
      detailedAnalysis: {
        questionFocus: "读后续写：与原文和段落开头的衔接",
        correctReasoning: [
          "1. 与原文衔接：续写内容要承接原文情节，不能突兀",
          "2. 段落开头衔接：第一句已给定，第二句必须自然承接",
          "3. 两段之间衔接：第一段结尾要为第二段开头做铺垫",
          "4. 人物一致：保持原文的人物设定和性格"
        ],
        studentMistake: "衔接问题：①没有充分利用给定开头展开 ②第一段和第二段之间缺少过渡 ③与原文故事线索脱节",
        similarPattern: "衔接技巧：①给定开头后立即写人物的具体反应 ②用'Just then/At that moment'等过渡 ③结尾回扣原文主题",
        tips: "续写衔接公式：给定开头 + 人物即时反应 + 关键动作/对话 + 情感变化 + 为下段铺垫"
      }
    },
  ]
};

// 错误类型配色
const errorTypes: Record<string, { color: string; desc: string }> = {
  "细节理解": { color: "#3b82f6", desc: "听力或阅读中关键信息捕捉不准" },
  "推断失误": { color: "#8b5cf6", desc: "基于文本推理判断有误" },
  "词汇辨析": { color: "#ef4444", desc: "近义词、形近词选择错误" },
  "语境理解": { color: "#f97316", desc: "未能准确理解上下文语境" },
  "语法错误": { color: "#eab308", desc: "时态、语态、词性等语法问题" },
  "词性转换": { color: "#22c55e", desc: "派生词、词形变化错误" },
  "主谓一致": { color: "#14b8a6", desc: "主语和谓语数的不一致" },
  "词汇搭配": { color: "#ec4899", desc: "固定搭配、习惯用法错误" },
  "内容缺失": { color: "#6366f1", desc: "写作要点不完整" },
  "内容不完整": { color: "#dc2626", desc: "续写内容单薄或缺失" },
  "语言错误": { color: "#ea580c", desc: "写作中的语法、拼写错误" },
  "语言单薄": { color: "#ca8a04", desc: "表达不够丰富生动" },
  "衔接不当": { color: "#0891b2", desc: "段落、句子衔接不自然" },
};

// 知识模块映射
const knowledgeModules: Record<string, { icon: string; color: string }> = {
  "听力": { icon: "🎧", color: "#3b82f6" },
  "阅读理解": { icon: "📖", color: "#22c55e" },
  "完形填空": { icon: "📝", color: "#ef4444" },
  "语法填空": { icon: "✏️", color: "#f97316" },
  "应用文写作": { icon: "✉️", color: "#8b5cf6" },
  "读后续写": { icon: "📚", color: "#ec4899" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PracticeQuestion = any;

// 针对性练习题库 - 根据掌握程度设计题量和难度
const practiceQuestions: Record<string, {
  mastery: number;
  totalQuestions: number;
  description: string;
  subTabs: Array<{
    name: string;
    level: string;
    icon: string;
    questions: PracticeQuestion[];
  }>;
}> = {
  "读后续写": {
    mastery: 12,
    totalQuestions: 15,
    description: "从基础句型到完整段落，循序渐进",
    subTabs: [
      {
        name: "句型模仿",
        level: "基础",
        icon: "📝",
        questions: [
          {
            id: 1,
            type: "rewrite",
            instruction: "将下列简单句改写成生动的描写句",
            original: "He was very happy.",
            hints: ["加入表情描写", "加入动作描写", "加入心理活动"],
            samples: [
              "A broad smile spread across his face, and his eyes sparkled with pure joy.",
              "Overwhelmed with happiness, he couldn't help but jump up and down excitedly.",
              "His heart swelled with joy as happy tears welled up in his eyes."
            ]
          },
          {
            id: 2,
            type: "rewrite",
            original: "She was scared.",
            hints: ["描写生理反应", "描写动作", "描写内心"],
            samples: [
              "Her heart pounded violently as cold sweat trickled down her back.",
              "Fear gripped her tightly, making her legs tremble uncontrollably.",
              "A chill ran down her spine, and she could barely catch her breath."
            ]
          },
        ]
      },
      {
        name: "情感描写",
        level: "进阶",
        icon: "💭",
        questions: [
          {
            id: 5,
            type: "describe",
            emotion: "感动/温暖",
            prompt: "描写一个人被他人善举感动的场景（3-4句）",
            keyElements: ["眼眶湿润", "心头一暖", "说不出话", "感激之情"],
            sample: "Tears welled up in her eyes as she looked at the unexpected gift. A warm feeling flooded through her heart, and for a moment, she was completely speechless. She tried to express her gratitude, but all she could manage was a choked whisper of 'thank you.'"
          },
        ]
      },
    ]
  },
  "完形填空": {
    mastery: 40,
    totalQuestions: 12,
    description: "从基础词汇到语境理解，逐步提升",
    subTabs: [
      {
        name: "词汇辨析",
        level: "基础",
        icon: "🔤",
        questions: [
          {
            id: 1,
            stem: "The school decided to ___ a ceremony to honor the retiring teacher.",
            options: ["A. celebrate", "B. hold", "C. describe", "D. organize"],
            answer: "B",
            explanation: "hold a ceremony 是固定搭配，意为'举行仪式'。",
            relatedError: "第42题"
          },
        ]
      },
    ]
  },
  "语法填空": {
    mastery: 60,
    totalQuestions: 10,
    description: "针对时态、非谓语、词性转换专项突破",
    subTabs: [
      {
        name: "时态语态",
        level: "基础",
        icon: "⏰",
        questions: [
          {
            id: 1,
            stem: "Yesterday, the plane ___ (fly) over the city during the celebration.",
            answer: "flew",
            explanation: "yesterday提示用一般过去时，fly→flew。",
            relatedError: "第58题"
          },
        ]
      },
    ]
  },
  "听力": {
    mastery: 80,
    totalQuestions: 5,
    description: "巩固细节捕捉能力，提升推断技巧",
    subTabs: [
      {
        name: "细节捕捉",
        level: "巩固",
        icon: "🎧",
        questions: [
          {
            id: 1,
            type: "tip",
            title: "关键词捕捉技巧",
            content: "听力中注意以下转折词后的信息：\n• but/however/yet — 转折后常是答案\n• actually/in fact — 表示真实情况\n• I mean — 表示解释说明",
            relatedError: "第4、8题"
          },
        ]
      },
    ]
  },
  "阅读理解": {
    mastery: 95,
    totalQuestions: 3,
    description: "保持优势，挑战高难度推理题",
    subTabs: [
      {
        name: "推理判断",
        level: "挑战",
        icon: "🧠",
        questions: [
          {
            id: 1,
            type: "tip",
            title: "推断题陷阱识别",
            content: "常见错误选项特征：\n• 过度推断：原文没有的信息\n• 以偏概全：只符合部分内容\n• 张冠李戴：混淆不同段落信息\n• 正反混淆：与原文态度相反",
            relatedError: "第34题"
          },
        ]
      }
    ]
  }
};

export default function EnglishExamAnalysis() {
  const [activeTab, setActiveTab] = useState('overview');
  const [practiceSection, setPracticeSection] = useState('读后续写');
  const [practiceSubTab, setPracticeSubTab] = useState(0);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [expandedErrors, setExpandedErrors] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    examData.questions.forEach(q => {
      if (!q.isCorrect && q.detailedAnalysis) {
        initial[`error-${q.id}`] = true;
      }
    });
    return initial;
  });

  // 按大题统计
  const getSectionStats = () => {
    return examData.sections.map(s => ({
      name: s.name,
      score: Math.round((s.studentScore / s.fullScore) * 100),
      studentScore: s.studentScore,
      fullScore: s.fullScore,
      lost: s.fullScore - s.studentScore,
      icon: knowledgeModules[s.name]?.icon || "📋"
    }));
  };

  // 错误类型统计
  const getErrorStats = () => {
    const map: Record<string, { lost: number; count: number }> = {};
    let totalLost = 0;
    examData.questions.forEach(q => {
      if (q.errorType) {
        const lost = q.maxScore - q.studentScore;
        if (!map[q.errorType]) map[q.errorType] = { lost: 0, count: 0 };
        map[q.errorType].lost += lost;
        map[q.errorType].count++;
        totalLost += lost;
      }
    });
    return Object.entries(map).map(([type, s]) => ({
      type,
      lost: s.lost,
      count: s.count,
      percentage: totalLost > 0 ? Math.round((s.lost / totalLost) * 100) : 0,
      color: errorTypes[type]?.color || '#666'
    })).sort((a, b) => b.lost - a.lost);
  };

  // 雷达图数据
  const getRadarData = () => {
    return examData.sections.map(s => ({
      subject: s.name,
      score: Math.round((s.studentScore / s.fullScore) * 100),
      fullMark: 100
    }));
  };

  const sectionStats = getSectionStats();
  const errorStats = getErrorStats();
  const radarData = getRadarData();
  const scoreRate = Math.round((examData.studentScore / examData.totalScore) * 100);
  const weakSections = sectionStats.filter(s => s.score < 70).sort((a, b) => a.score - b.score);
  const wrongQuestions = examData.questions.filter(q => !q.isCorrect);

  // 预测提分
  const predictedImprovement = Math.round(wrongQuestions.reduce((sum, q) => {
    const potential = q.maxScore - q.studentScore;
    const rate = q.section === "读后续写" ? 0.5 : q.section === "完形填空" ? 0.7 : 0.8;
    return sum + potential * rate;
  }, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {examData.studentName[0]}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{examData.studentName} · AI英语学情诊断</h1>
                  <p className="text-sm text-gray-500">{examData.examTitle} · {examData.subject}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">{examData.studentScore}</p>
                <p className="text-xs text-gray-400">得分/{examData.totalScore}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{scoreRate}%</p>
                <p className="text-xs text-gray-400">得分率</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">+{predictedImprovement}</p>
                <p className="text-xs text-gray-400">提分空间</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab导航 */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '诊断总览' },
            { id: 'radar', label: '能力雷达' },
            { id: 'errors', label: '错题分析' },
            { id: 'practice', label: '针对练习' },
            { id: 'plan', label: '提分方案' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div className="bg-white rounded-2xl shadow-lg p-5">

          {/* 总览 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 各大题得分 */}
              <div>
                <h3 className="font-bold text-gray-700 mb-4">各题型得分详情</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sectionStats.map((s, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        s.score >= 80 ? 'border-green-200 bg-green-50' :
                        s.score >= 60 ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{s.icon}</span>
                        <span className={`text-2xl font-bold ${
                          s.score >= 80 ? 'text-green-600' :
                          s.score >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>{s.score}%</span>
                      </div>
                      <p className="font-medium text-gray-700">{s.name}</p>
                      <p className="text-sm text-gray-500">{s.studentScore}/{s.fullScore}分</p>
                      {s.lost > 0 && (
                        <p className="text-xs text-red-500 mt-1">失分: -{s.lost}分</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 失分原因分布 */}
              <div>
                <h3 className="font-bold text-gray-700 mb-3">失分原因TOP5</h3>
                <div className="space-y-3">
                  {errorStats.slice(0, 5).map((e, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }}></span>
                          {e.type}
                        </span>
                        <span className="text-gray-500">{e.lost}分 · {e.count}处错误</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI诊断结论 */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2">AI诊断结论</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {examData.studentName}同学本次英语期中考试得分<b>{examData.studentScore}分</b>（得分率{scoreRate}%），
                  整体处于<b className={scoreRate >= 80 ? 'text-green-600' : scoreRate >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                    {scoreRate >= 85 ? '优秀' : scoreRate >= 75 ? '良好' : scoreRate >= 60 ? '中等' : '待提高'}
                  </b>水平。
                </p>
                <p className="text-gray-700 leading-relaxed text-sm mt-2">
                  <b className="text-green-600">优势项目</b>：阅读理解表现突出（{sectionStats.find(s => s.name === '阅读理解')?.score}%），说明文章理解能力较强。
                </p>
                <p className="text-gray-700 leading-relaxed text-sm mt-2">
                  <b className="text-red-600">薄弱环节</b>：
                  {weakSections.map((w, i) => (
                    <span key={i}>
                      <b>{w.name}</b>（{w.score}%）{i < weakSections.length - 1 ? '、' : ''}
                    </span>
                  ))}
                  需重点提升。特别是<b className="text-red-600">读后续写</b>仅得3分，需要系统训练。
                </p>
                <p className="text-gray-700 leading-relaxed text-sm mt-2">
                  主要失分原因集中在<b className="text-orange-600">{errorStats[0]?.type}</b>和
                  <b className="text-orange-600">{errorStats[1]?.type}</b>，
                  通过针对性训练，预计可提升<b className="text-green-600">{predictedImprovement}分</b>，
                  目标分数<b className="text-indigo-600">{Math.min(examData.studentScore + predictedImprovement, examData.totalScore)}分</b>。
                </p>
              </div>
            </div>
          )}

          {/* 能力雷达 */}
          {activeTab === 'radar' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">英语能力雷达图</h3>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="得分率"
                      dataKey="score"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Tooltip formatter={(v) => `${v}%`} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* 能力解读 */}
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-gray-700">能力维度解读</h4>
                {sectionStats.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{s.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{s.name}</span>
                        <span className={`font-bold ${
                          s.score >= 80 ? 'text-green-600' :
                          s.score >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>{s.score}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            s.score >= 80 ? 'bg-green-500' :
                            s.score >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {s.score >= 80 ? '掌握良好，继续保持' :
                         s.score >= 60 ? '有提升空间，需加强练习' :
                         '薄弱环节，需重点突破'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 错题分析 */}
          {activeTab === 'errors' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">错题详细分析 ({wrongQuestions.length}处错误)</h3>

              {/* 按大题分类显示错题 */}
              {['听力', '阅读理解', '完形填空', '语法填空', '应用文写作', '读后续写'].map(section => {
                const sectionErrors = wrongQuestions.filter(q => q.section === section);
                if (sectionErrors.length === 0) return null;

                return (
                  <div key={section} className="mb-6">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                      <span className="text-xl">{knowledgeModules[section]?.icon}</span>
                      <span className="font-bold text-gray-700">{section}</span>
                      <span className="text-sm text-red-500">({sectionErrors.length}处错误)</span>
                    </div>

                    <div className="space-y-4">
                      {sectionErrors.map(q => (
                        <div key={q.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                          {/* 基本信息 */}
                          <div className="p-4 bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-0.5 bg-white border rounded text-xs font-medium">第{q.id}题</span>
                                  <span className="text-gray-600 text-sm">{q.knowledgePoint}</span>
                                  {q.errorType && (
                                    <span
                                      className="px-2 py-0.5 rounded text-xs text-white"
                                      style={{ backgroundColor: errorTypes[q.errorType]?.color }}
                                    >
                                      {q.errorType}
                                    </span>
                                  )}
                                </div>
                                {q.context && (
                                  <p className="text-sm text-gray-500 mt-2 italic bg-white px-2 py-1 rounded">&quot;{q.context}&quot;</p>
                                )}
                                {q.studentAnswer && (
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm">
                                      <span className="text-gray-500">你的答案：</span>
                                      <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">{q.studentAnswer}</span>
                                    </span>
                                    {q.correctAnswer && (
                                      <span className="text-sm">
                                        <span className="text-gray-500">正确答案：</span>
                                        <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">{q.correctAnswer}</span>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-red-500">-{q.maxScore - q.studentScore}</p>
                                <p className="text-xs text-gray-400">{q.studentScore}/{q.maxScore}分</p>
                              </div>
                            </div>

                            {/* 展开详细分析按钮 */}
                            {q.detailedAnalysis && (
                              <button
                                onClick={() => setExpandedErrors({...expandedErrors, [`error-${q.id}`]: !expandedErrors[`error-${q.id}`]})}
                                className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                              >
                                {expandedErrors[`error-${q.id}`] ? '收起详细解析' : '查看详细解析'}
                              </button>
                            )}
                          </div>

                          {/* 详细解析展开区 */}
                          {q.detailedAnalysis && expandedErrors[`error-${q.id}`] && (
                            <div className="border-t bg-white p-4 space-y-4">
                              {/* 考查重点 */}
                              <div>
                                <h5 className="text-sm font-bold text-indigo-700 mb-1">考查重点</h5>
                                <p className="text-sm text-gray-700 bg-indigo-50 p-2 rounded">{q.detailedAnalysis.questionFocus}</p>
                              </div>

                              {/* 正确解题思路 */}
                              <div>
                                <h5 className="text-sm font-bold text-green-700 mb-2">正确解题思路</h5>
                                <div className="space-y-1">
                                  {q.detailedAnalysis.correctReasoning.map((step: string, idx: number) => (
                                    <p key={idx} className="text-sm text-gray-700 bg-green-50 p-2 rounded flex items-start gap-2">
                                      <span className="text-green-600 font-medium">-&gt;</span>
                                      {step}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* 你的错误分析 */}
                              <div>
                                <h5 className="text-sm font-bold text-red-700 mb-1">你的错误在哪</h5>
                                <p className="text-sm text-gray-700 bg-red-50 p-2 rounded border-l-4 border-red-400">{q.detailedAnalysis.studentMistake}</p>
                              </div>

                              {/* 同类题型规律 */}
                              <div>
                                <h5 className="text-sm font-bold text-purple-700 mb-1">同类题规律</h5>
                                <p className="text-sm text-gray-700 bg-purple-50 p-2 rounded">{q.detailedAnalysis.similarPattern}</p>
                              </div>

                              {/* 记忆技巧 */}
                              <div>
                                <h5 className="text-sm font-bold text-yellow-700 mb-1">记忆技巧</h5>
                                <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded font-medium">{q.detailedAnalysis.tips}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 针对练习 */}
          {activeTab === 'practice' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">针对性练习题库</h3>
              <p className="text-sm text-gray-500 mb-4">根据你的薄弱程度智能分配题量，点击各模块开始练习</p>

              {/* 模块选择 - 按掌握度排序 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(practiceQuestions)
                  .sort((a, b) => a[1].mastery - b[1].mastery)
                  .map(([section, data]) => (
                  <button
                    key={section}
                    onClick={() => { setPracticeSection(section); setPracticeSubTab(0); setShowAnswer({}); }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                      practiceSection === section
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{section}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      practiceSection === section ? 'bg-white/20' :
                      data.mastery < 50 ? 'bg-red-100 text-red-600' :
                      data.mastery < 70 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {data.mastery}%
                    </span>
                    <span className={`text-xs ${practiceSection === section ? 'text-white/70' : 'text-gray-400'}`}>
                      ({data.totalQuestions}题)
                    </span>
                  </button>
                ))}
              </div>

              {/* 当前模块信息 */}
              {practiceQuestions[practiceSection] && (
                <div className={`p-3 rounded-lg mb-4 ${
                  practiceQuestions[practiceSection].mastery < 50 ? 'bg-red-50 border border-red-200' :
                  practiceQuestions[practiceSection].mastery < 70 ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${
                        practiceQuestions[practiceSection].mastery < 50 ? 'text-red-700' :
                        practiceQuestions[practiceSection].mastery < 70 ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {practiceQuestions[practiceSection].mastery < 50 ? '重点突破' :
                         practiceQuestions[practiceSection].mastery < 70 ? '强化训练' :
                         '巩固提高'}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">{practiceQuestions[practiceSection].description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-700">{practiceQuestions[practiceSection].totalQuestions}</p>
                      <p className="text-xs text-gray-500">推荐题量</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 小Tab - 难度分级 */}
              {practiceQuestions[practiceSection]?.subTabs && (
                <div className="flex gap-2 mb-4 border-b pb-2">
                  {practiceQuestions[practiceSection].subTabs.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setPracticeSubTab(idx); setShowAnswer({}); }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                        practiceSubTab === idx
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        sub.level === '基础' ? 'bg-green-100 text-green-600' :
                        sub.level === '进阶' || sub.level === '专项' ? 'bg-yellow-100 text-yellow-600' :
                        sub.level === '挑战' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>{sub.level}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 题目展示 */}
              <div className="space-y-4">
                {practiceQuestions[practiceSection]?.subTabs?.[practiceSubTab]?.questions.map((q, qIdx) => (
                  <div key={q.id as number} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    {/* 改写题 */}
                    {q.type === 'rewrite' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">改写练习</span>
                          <span className="text-gray-500 text-sm">{q.instruction as string}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <p className="text-gray-600">原句：<span className="font-medium text-gray-800">{q.original as string}</span></p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(q.hints as string[]).map((hint, i) => (
                            <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">{hint}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏参考答案' : '查看参考答案'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 space-y-2">
                            {(q.samples as string[]).map((sample, i) => (
                              <div key={i} className="p-2 bg-green-50 rounded text-sm text-green-800 border-l-4 border-green-500">
                                {sample}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 描写题 */}
                    {q.type === 'describe' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs font-medium">情感描写</span>
                          <span className="text-gray-700 font-medium">{q.emotion as string}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{q.prompt as string}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(q.keyElements as string[]).map((el, i) => (
                            <span key={i} className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded">{el}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏参考答案' : '查看参考答案'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-green-50 rounded text-sm text-green-800">
                            {q.sample as string}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 选择题 */}
                    {!q.type && q.options && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">第{qIdx + 1}题</span>
                          {q.relatedError && <span className="text-xs text-gray-400">关联错题: {q.relatedError as string}</span>}
                        </div>
                        <p className="text-gray-800 mb-3">{q.stem as string}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {(q.options as string[]).map((opt, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded text-sm cursor-pointer transition-all ${
                                showAnswer[q.id as number] && opt.startsWith(q.answer as string)
                                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                              onClick={() => setShowAnswer({...showAnswer, [q.id as number]: true})}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏解析' : '查看答案解析'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-blue-50 rounded">
                            <p className="text-sm text-blue-800"><b>答案：{q.answer as string}</b></p>
                            <p className="text-sm text-gray-600 mt-1">{q.explanation as string}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 填空题 */}
                    {!q.type && q.answer && !q.options && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">填空</span>
                          {q.relatedError && <span className="text-xs text-gray-400">关联错题: {q.relatedError as string}</span>}
                        </div>
                        <p className="text-gray-800 mb-3">{q.stem as string}</p>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏答案' : '查看答案'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-green-50 rounded">
                            <p className="text-sm text-green-800"><b>答案：{q.answer as string}</b></p>
                            <p className="text-sm text-gray-600 mt-1">{q.explanation as string}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 技巧提示 */}
                    {q.type === 'tip' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">技巧</span>
                          <span className="font-medium text-gray-700">{q.title as string}</span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{q.content as string}</p>
                        </div>
                        {q.relatedError && (
                          <p className="text-xs text-gray-400 mt-2">关联错题: {q.relatedError as string}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 提分方案 */}
          {activeTab === 'plan' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">个性化提分方案</h3>

              {/* 目标卡片 */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="opacity-90">按照以下方案学习，预计可达到</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.min(examData.studentScore + predictedImprovement, examData.totalScore)}分
                      <span className="text-lg opacity-80 ml-2">
                        (+{predictedImprovement}分)
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold opacity-30">目标</p>
                  </div>
                </div>
              </div>

              {/* 分优先级的建议 */}
              <div className="space-y-4">
                {/* 紧急 - 读后续写 */}
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">紧急提升</span>
                    <span className="font-medium text-gray-700">读后续写 (当前12%)</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><b>问题诊断：</b>本次续写几乎空白，仅得3分。说明对续写题型不熟悉或时间分配不当。</p>
                    <p><b>提升策略：</b></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>每周精读2篇续写范文，积累情节发展模式</li>
                      <li>背诵20个高分动作描写、情感描写句型</li>
                      <li>练习&quot;读原文-&gt;列提纲-&gt;写续写&quot;的完整流程</li>
                      <li>限时训练：第一段8分钟，第二段8分钟</li>
                    </ul>
                    <p className="text-green-600"><b>预期提升：</b>+12分（目标15分）</p>
                  </div>
                </div>

                {/* 高优先级 - 完形填空 */}
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">高优先级</span>
                    <span className="font-medium text-gray-700">完形填空 (当前40%)</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><b>问题诊断：</b>15题错9题，主要问题是词汇辨析和语境理解能力不足。</p>
                    <p><b>提升策略：</b></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>建立&quot;完形高频词汇本&quot;，整理近义词辨析</li>
                      <li>练习&quot;先通读全文-&gt;再逐题分析&quot;的做题顺序</li>
                      <li>每篇完形做完后，总结3-5个关键词汇搭配</li>
                    </ul>
                    <p className="text-green-600"><b>预期提升：</b>+6分（目标12分）</p>
                  </div>
                </div>

                {/* 中优先级 - 语法填空 */}
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">中优先级</span>
                    <span className="font-medium text-gray-700">语法填空 (当前60%)</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><b>问题诊断：</b>时态（flew）、非谓语（featuring）、比较级（more satisfied）等语法点掌握不牢。</p>
                    <p><b>提升策略：</b></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>复习动词时态8种基本形式</li>
                      <li>掌握非谓语动词（to do/doing/done）的用法区别</li>
                      <li>整理形容词、副词的比较级变化规则</li>
                    </ul>
                    <p className="text-green-600"><b>预期提升：</b>+4分（目标13分）</p>
                  </div>
                </div>

                {/* 保持优势 - 阅读理解 */}
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">保持优势</span>
                    <span className="font-medium text-gray-700">阅读理解 (当前95%)</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>阅读理解表现优秀！继续保持每周3-4篇限时阅读训练，注意推理判断题的答题技巧。</p>
                  </div>
                </div>
              </div>

              {/* 周计划 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">推荐周学习计划</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, idx) => (
                    <div key={day} className="bg-white p-2 rounded-lg shadow-sm">
                      <p className="font-medium text-gray-600">{day}</p>
                      <p className="text-gray-500 mt-1 leading-tight" style={{ fontSize: '10px' }}>
                        {idx === 0 && "完形专项"}
                        {idx === 1 && "语法填空"}
                        {idx === 2 && "续写训练"}
                        {idx === 3 && "听力精听"}
                        {idx === 4 && "完形+语法"}
                        {idx === 5 && "续写+范文"}
                        {idx === 6 && "综合模拟"}
                      </p>
                      <p className="text-indigo-600 font-medium mt-1">
                        {idx < 5 ? '45min' : '90min'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          基于雅礼教育集团2025年高一期中考试答题卡 · AI视觉分析生成 · {examData.studentName}英语学情诊断
        </p>
      </div>
    </div>
  );
}
