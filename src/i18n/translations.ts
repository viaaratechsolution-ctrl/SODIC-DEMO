export type Language = 'ar' | 'en';

export interface SiteDictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  brand: {
    viaaraHomeLabel: string;
    viaaraBackToTopLabel: string;
    viaaraLogoAlt: string;
    countryBadge: string;
  };
  nav: {
    mainAriaLabel: string;
    mobileAriaLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    languageSwitcherLabel: string;
    about: string;
    app: string;
    workflow: string;
    demo: string;
    team: string;
    contact: string;
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    tryDemo: string;
    aboutViaara: string;
    stats: { value: string; label: string }[];
  };
  about: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    p1Bold: string;
    p1Rest: string;
    p2: string;
    services: {
      title: string;
      desc: string;
      icon: 'code' | 'smartphone' | 'palette' | 'cloud' | 'workflow' | 'brain';
    }[];
  };
  product: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    problemTitle: string;
    problems: string[];
    solutionTitle: string;
    solutionHeading: string;
    solutionBody: string;
    features: {
      title: string;
      desc: string;
      icon: 'clipboard' | 'chat' | 'chart' | 'bell' | 'building' | 'key';
    }[];
  };
  workflow: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    steps: { num: string; title: string; desc: string }[];
  };
  demoSection: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    hint: string;
    loadingWorkspace: string;
    guidedPrompt: string;
    guidedStep1: string;
    guidedStep2: string;
    guidedStep3: string;
    prevScreenLabel: string;
    nextScreenLabel: string;
    screensTablistLabel: string;
    screenIndicatorLabel: string;
    workflowStepsListLabel: string;
    resetDemo: string;
    expandPhone: string;
    collapsePhone: string;
  };
  teamSection: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    photoAltPrefix: string;
  };
  contact: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    ctaButton: string;
    email: string;
    phone1: string;
    phone2: string;
  };
  footer: {
    platformTag: string;
    copyright: string;
  };
  demoUi: {
    firm: {
      firmName: string;
      shortFirmName: string;
      workspaceTag: string;
      subtitle: string;
      channelSubtitle: string;
      regionBadge: string;
    };
    screens: {
      home: { num: string; title: string; caption: string; headerTitle: string };
      tasks: { num: string; title: string; caption: string; headerTitle: string };
      'task-details': { num: string; title: string; caption: string; headerTitle: string };
      'create-task': { num: string; title: string; caption: string; headerTitle: string; subtitle: string };
      'my-task': { num: string; title: string; caption: string; headerTitle: string; subtitle: string };
      'team-chat': { num: string; title: string; caption: string; headerTitle: string };
      performance: { num: string; title: string; caption: string; headerTitle: string };
    };
    navTabs: {
      ariaLabel: string;
      home: string;
      tasks: string;
      chat: string;
      performance: string;
    };
    header: {
      backLabel: string;
      notificationsLabel: string;
      notificationsDialogLabel: string;
      teamNotificationsTitle: string;
      markAllRead: string;
      profileDialogLabel: string;
      profileButtonPrefix: string;
      shareTaskLabel: string;
      workspaceSettings: string;
      fullVersionToast: string;
      allReadToast: string;
    };
    common: {
      now: string;
      todayAtPrefix: string;
      liveUpdate: string;
      liveAnalysis: string;
      highPriority: string;
      urgent: string;
      mediumPriority: string;
      lowPriority: string;
      completedCheck: string;
      completed: string;
      inProgress: string;
      pending: string;
      siteVisit: string;
      overdue: string;
      client: string;
      projectSite: string;
      assignee: string;
      targetDate: string;
      priority: string;
      cancel: string;
      save: string;
      delete: string;
      clear: string;
      done: string;
      optional: string;
      add: string;
      unitCodeLabel: string;
      defaultAssigneeLabel: string;
      stepsCompletedOf: (done: number, total: number) => string;
    };
    categories: {
      reservation: string;
      handover: string;
      inspection: string;
      contracts: string;
      'customer-care': string;
    };
    projects: {
      all: string;
      'east-town': string;
      villette: string;
      'west-park': string;
    };
    home: {
      greeting: (firstName: string) => string;
      subtitle: string;
      createNewTaskLabel: string;
      hotspotText: string;
      todaysProgressTitle: string;
      onTrack: string;
      completed: string;
      steady: string;
      tasksCompletedOf: (done: number, total: number) => string;
      statCompleted: string;
      statInProgress: string;
      statPending: string;
      quickActionsTitle: string;
      instantActionBadge: string;
      quickReservation: string;
      quickInspection: string;
      quickHandover: string;
      dailyPrioritiesTitle: string;
      overdueInstallmentSummary: (count: number, amount: string) => string;
      dueInstallmentsSummary: (count: number) => string;
      allPaidSummary: string;
      openSnagsSummary: (count: number) => string;
      allSnagsClosedSummary: string;
      priorityFollowUpPrefix: string;
      upcomingTasksTitle: string;
      viewUrgent: string;
      allDoneToday: string;
      recentActivityTitle: string;
    };
    tasks: {
      title: string;
      subtitle: string;
      searchLabel: string;
      searchPlaceholder: string;
      clearSearchLabel: string;
      sortLabel: string;
      sortSheetLabel: string;
      sortByTitle: string;
      sortNewest: string;
      sortDeadline: string;
      sortPriority: string;
      projectFilterLabel: string;
      filters: {
        all: string;
        'in-progress': string;
        completed: string;
        pending: string;
      };
      highPriorityBanner: string;
      emptyTitle: string;
      emptySubtitle: string;
      showAllTasks: string;
      createNewTaskLabel: string;
    };
    taskDetails: {
      shareLabel: string;
      responsibleMember: string;
      installmentsTitle: string;
      installmentPaidBadge: string;
      installmentOverdueBadge: string;
      installmentDueBadge: string;
      remindedBtn: string;
      sendPaymentReminderBtn: string;
      markPaidBtn: string;
      snagSummaryTitle: string;
      snagsResolvedOf: (resolved: number, total: number) => string;
      reviewSnagsBtn: string;
      stepsTitle: string;
      activityLogTitle: string;
      taskCompletedLog: string;
      progressPctLog: (pct: number) => string;
      taskOpenedLog: (unitCode: string) => string;
      messageTeamBtn: string;
      executionScreenBtn: string;
      completedBtn: string;
      confirmCompleteBtn: string;
    };
    stepper: {
      title: string;
    };
    documents: {
      title: (count: number) => string;
      empty: string;
      optionsLabel: (name: string) => string;
      preview: string;
      download: string;
      previewToast: (name: string) => string;
      downloadToast: (name: string) => string;
      uploadAriaLabel: string;
      uploadTitle: string;
      uploadSubtitle: string;
      uploadedStatus: string;
    };
    createTask: {
      categoryTitle: string;
      chooseTrack: string;
      requiredMark: string;
      titleLabel: string;
      titlePlaceholder: string;
      refLabel: string;
      unitCodeLabel: string;
      descLabel: string;
      clientSectionTitle: string;
      clientNameLabel: string;
      clientNamePlaceholder: string;
      compoundLabel: string;
      priorityLabel: string;
      uploadPhotosLabel: string;
      uploadedPhotoAlt: (idx: number) => string;
      removePhotoLabel: string;
      uploadPhotosTitle: string;
      uploadPhotosHint: string;
      scheduleSectionTitle: string;
      assigneeLabel: string;
      teamMembersLabel: string;
      addMemberBtn: string;
      createdDateLabel: string;
      deadlineLabel: string;
      customDateOption: string;
      customDatePlaceholder: string;
      stepsSectionTitle: string;
      moveUpLabel: (label: string) => string;
      moveDownLabel: (label: string) => string;
      removeStepLabel: (label: string) => string;
      addStepPlaceholder: string;
      docsSectionTitle: (count: number) => string;
      maxFileSize: string;
      uploadDocAriaLabel: string;
      uploadDocTitle: string;
      uploadDocHint: string;
      alertsSectionTitle: string;
      clientUpdateTitle: string;
      clientUpdateSubtitle: (client: string) => string;
      clientUpdateSwitchLabel: string;
      alert24hTitle: string;
      alert24hSubtitle: string;
      alert24hSwitchLabel: string;
      submitBtn: string;
      errors: {
        title: string;
        clientName: string;
        assigneeId: string;
        deadline: string;
      };
      defaults: {
        clientName: string;
        createdDate: string;
        deadlinePreset: string;
        deadlinePresets: string[];
        defaultSteps: string[];
        fallbackStep: string;
        fallbackUnitType: string;
        fallbackPriceEgp: string;
        reservationInstallment: string;
        dueInstallment: string;
        reservationAmount: string;
        dueAmount: string;
        docStatusUploaded: string;
        docStatusVerified: string;
        docStatusReady: string;
        docNames: [string, string, string];
      };
    };
    myTask: {
      assignedScreenSubtitle: string;
      taskOptionsLabel: string;
      shareLabel: string;
      executionStepsTitle: string;
      snagCardTitle: string;
      addSnagBtn: string;
      snagPlaceholder: string;
      snagAreaLabel: string;
      snagAreas: string[];
      saveSnagBtn: string;
      noSnagsMessage: string;
      snagsFixedCount: (resolved: number, total: number) => string;
      tapToToggleStatus: string;
      snagFixed: string;
      snagPending: string;
      notesTitle: string;
      addNoteBtn: string;
      notePlaceholder: string;
      saveNoteBtn: string;
      notesEmptyPrompt: string;
      photoAriaLabel: string;
      photoAlt: (idx: number) => string;
      removePhotoLabel: string;
      attachPhotosTitle: string;
      attachPhotosHint: string;
      incompleteTitle: string;
      incompleteBody: (remaining: number) => string;
      completeAllAction: string;
      deliveredBtn: string;
      confirmSubmitBtn: string;
      remainingStepsToast: (remaining: number) => string;
    };
    teamChat: {
      verifiedChannelLabel: string;
      chatOptionsLabel: string;
      chatActionsLabel: string;
      backToHome: string;
      todayBadge: string;
      attachedTaskLabel: string;
      viewDetails: string;
      saraTyping: string;
      emojiDialogLabel: string;
      takePhotoLabel: string;
      attachFileLabel: string;
      composerPlaceholder: string;
      composerAriaLabel: string;
      insertEmojiLabel: string;
      sendMessageLabel: string;
    };
    performance: {
      periodAriaLabel: string;
      periods: {
        today: string;
        week: string;
        month: string;
      };
      progressIndexTitle: string;
      projectCompletionTitle: string;
      tasksOnSchedule: (done: number, total: number) => string;
      collectionsTitle: string;
      installmentsPaidOf: (paid: number, total: number) => string;
      overdueInstallmentAction: string;
      collectionsSteady: string;
      inspectionReadinessTitle: string;
      snagsFixedOf: (resolved: number, total: number) => string;
      needsAttentionTitle: string;
      remindedBtn: string;
      sendReminderBtn: string;
      noOverdueMessage: string;
      activeTasksTitle: string;
      tasksCountPill: (count: number) => string;
      viewAllBtn: string;
      teamPerformanceTitle: string;
      activeMembersCount: (count: number) => string;
      memberProgressOnTime: (role: string, done: number, total: number) => string;
    };
    shareSheet: {
      closeLabel: string;
      title: string;
      noteAriaLabel: string;
      notePlaceholder: string;
      sendBtn: string;
    };
    toasts: {
      resetDemo: string;
      assignedTo: (name: string) => string;
      taskCompleted: (title: string) => string;
      allStepsDone: string;
      noteAdded: string;
      photoAttached: string;
      docUploaded: (name: string) => string;
      docRemoved: string;
      installmentPaid: string;
      installmentReminderSent: (client: string) => string;
      snagResolved: string;
      snagReopened: string;
      snagAdded: string;
      sharedAgain: string;
      sharedToChat: string;
      openChat: string;
      attachedToChat: string;
      reminderSentTo: (name: string) => string;
    };
    events: {
      assignedDetail: (name: string, ref: string) => string;
      completedSummary: (name: string) => string;
      completedDetail: (title: string) => string;
      allStepsVerified: string;
      installmentCollectedSummary: (label: string) => string;
      installmentPaidNow: string;
      installmentReminderSummary: (client: string) => string;
      snagClosedSummary: string;
      snagReopenedSummary: string;
      snagAddedSummary: string;
      sharedSummary: (user: string, title: string) => string;
      reminderSummary: (name: string) => string;
      reminderDetailOverdue: string;
      shareReplyAgain: (ref: string) => string;
      shareReplyFirst: string;
      fallbackCompletedTitle: string;
    };
  };
}

export const translations: Record<Language, SiteDictionary> = {
  ar: {
    meta: {
      title: 'فيارا تك — منصة إدارة المشروعات والمبيعات والتسليمات العقارية',
      description:
        'تقدّم فيارا تك منصة رقمية متكاملة لشركات التطوير العقاري لإدارة الإطلاقات، وحجوزات الوحدات، والتسليمات، والمعاينات الميدانية، ومراجعة العقود، ومتابعة العملاء لحظيًا.',
      ogTitle: 'فيارا تك — منصة إدارة المشروعات والمبيعات والتسليمات العقارية',
      ogDescription:
        'منصة تشغيل متكاملة لفرق المبيعات والتسليم والمواقع وخدمة العملاء في المشروعات العقارية مع رؤية فورية للإدارة.',
    },
    brand: {
      viaaraHomeLabel: 'فيارا تك — الرئيسية',
      viaaraBackToTopLabel: 'فيارا تك — العودة للأعلى',
      viaaraLogoAlt: 'شعار فيارا تك',
      countryBadge: 'مصر',
    },
    nav: {
      mainAriaLabel: 'التنقل الرئيسي',
      mobileAriaLabel: 'قائمة الجوال',
      openMenuLabel: 'فتح القائمة',
      closeMenuLabel: 'إغلاق القائمة',
      languageSwitcherLabel: 'Change language / تغيير اللغة',
      about: 'عن فيارا تك',
      app: 'المنصة',
      workflow: 'آلية العمل',
      demo: 'التجربة الحية',
      team: 'فريق العمل',
      contact: 'تواصل معنا',
    },
    hero: {
      badge: 'عرض تفاعلي لمنصة إدارة المبيعات والتسليمات العقارية',
      titlePrefix: 'إدارة كل إطلاق وتسليم ووحدة،',
      titleHighlight: 'في تناغم لحظي كامل.',
      description:
        'طوّرت فيارا تك منصة تشغيل موحدة تمنح قيادات التطوير العقاري ومديري المشروعات رؤية لحظية على حجوزات الوحدات، والتسليمات، والمعاينات الميدانية، ومراجعة العقود، ومتابعة العملاء من شاشة واحدة.',
      tryDemo: 'جرّب المنصة مباشرة',
      aboutViaara: 'تعرّف على فيارا تك',
      stats: [
        { value: '+50', label: 'مشروعًا رقميًا مُنفذًا' },
        { value: '+20', label: 'شراكة مع شركات ومؤسسات كبرى' },
        { value: '100%', label: 'ترابط لحظي بين المبيعات والموقع' },
      ],
    },
    about: {
      kicker: 'عن فيارا تك',
      titlePrefix: 'هندسة برمجية تصنع',
      titleHighlight: 'تميّزًا رقميًا حقيقيًا.',
      p1Bold: 'فيارا تك (VIAARA TECH)',
      p1Rest:
        ' شركة متخصصة في تطوير الحلول البرمجية المؤسسية، نحول تحديات التشغيل المعقدة إلى منتجات رقمية سلسة وآمنة وقابلة للتوسع.',
      p2: 'نعمل منذ عام 2021 على بناء أنظمة تشغيل وتطبيقات مخصصة لكبرى الشركات والمطورين العقاريين، ونجمع بين الخبرة الهندسية العميقة وفهم تفاصيل العمل الميداني — من مرحلة التحليل والتصميم وحتى التشغيل والدعم المستمر.',
      services: [
        {
          title: 'برمجيات مخصصة للمشروعات',
          desc: 'أنظمة مرنة مصممة خصيصًا لتتوافق مع دورة العمل الفعلية داخل إدارات المبيعات والتسليم.',
          icon: 'code',
        },
        {
          title: 'تطبيقات الويب والموبايل',
          desc: 'تطبيقات سريعة تعمل بسلاسة على iOS وAndroid والويب لمتابعة الفرق الميدانية والمكتبية.',
          icon: 'smartphone',
        },
        {
          title: 'تصميم تجربة وواجهة المستخدم',
          desc: 'واجهات عربية واضحة ومريحة للعين ترفع سرعة الإنجاز وتقلل أخطاء الإدخال اليومية.',
          icon: 'palette',
        },
        {
          title: 'البنية السحابية والتكامل',
          desc: 'ربط آمن ومستقر مع أنظمة ERP وCRM وإدارة علاقات العملاء وقواعد البيانات الحالية.',
          icon: 'cloud',
        },
        {
          title: 'الأتمتة واستمرارية التشغيل',
          desc: 'بيئات نشر مؤتمتة وإدارة تشغيلية تضمن استقرار المنصة أثناء ذروة الإطلاقات العقارية.',
          icon: 'workflow',
        },
        {
          title: 'الذكاء الاصطناعي وتحليل البيانات',
          desc: 'تنبيهات استباقية ومؤشرات أداء ذكية تساعد الإدارة على رصد الاختناقات قبل حدوثها.',
          icon: 'brain',
        },
      ],
    },
    product: {
      kicker: 'المنصة العقارية المقترحة',
      titlePrefix: 'مساحة عمل المبيعات والتسليم —',
      titleHighlight: 'ترابط كامل لعمليات التطوير العقاري.',
      subtitle:
        'تطبيق عملي صُمم خصيصًا لمديري المشروعات، ومديري المبيعات، ومهندسي المواقع، ومسؤولي العقود، وفرق خدمة العملاء. يستبدل الرسائل المتفرقة وجداول المتابعة اليدوية بنظام منظم لإدارة حجوزات الوحدات، ومعاينات المواقع، ومراجعة عقود التمليك، وجداول تسليم الفيلات والشقق.',
      problemTitle: 'التحديات اليومية في المتابعة',
      problems: [
        'تشتت مواعيد التسليم والمعاينات وطلبات العملاء بين رسائل البريد الإلكتروني والمجموعات الفردية وجداول Excel',
        'إهدار وقت مديري المبيعات والمشروعات في متابعة مسؤولي العقود ومهندسي المواقع لمعرفة حالة كل وحدة',
        'اكتشاف تأخر مراجعة عقود الحجز أو نواقص التسليم في وقت متأخر مما يؤثر على تجربة العميل وموعد الاستلام',
      ],
      solutionTitle: 'الحل الموحد من فيارا تك',
      solutionHeading:
        'مرجع واحد موثوق لإدارة العمليات العقارية بالكامل — كل حجز، وكل معاينة موقع، وكل تسليم وحدة مرتبط بمسؤول محدد، وموعد واضح، ومرحلة حية، ومستندات ومحادثة موثقة.',
      solutionBody:
        'يتوقف المديرون عن ملاحقة التحديثات يدويًا، ويعرف كل فرد في المبيعات أو الموقع أو خدمة العملاء خطوته التالية بوضوح، بينما تراقب الإدارة مؤشر الإنجاز العام لكل كمبوند لحظة بلحظة.',
      features: [
        {
          title: 'توزيع ذكي للمهام والوحدات',
          desc: 'أنشئ مهام حجز وحدة، أو تسليم فيلا، أو معاينة موقع، أو مراجعة عقد تمليك مع تحديد المسؤول والأولوية والموعد في ثوانٍ.',
          icon: 'clipboard',
        },
        {
          title: 'محادثة فريق مدمجة بالوحدات',
          desc: 'قناة جماعية لفرق المبيعات والتسليم والمواقع تتيح مشاركة بطاقة أي وحدة أو عقد مباشرة داخل المحادثة دون تشتيت.',
          icon: 'chat',
        },
        {
          title: 'مؤشر إنجاز حي للإدارة',
          desc: 'قياس فوري لنسب الإنجاز عبر فترات اليوم والأسبوع والشهر، مع أشرطة تقدم واضحة لكل عضو في الفريق.',
          icon: 'chart',
        },
        {
          title: 'تنبيهات استباقية للمواعيد',
          desc: 'إشعارات تلقائية قبل موعد المعاينة أو التسليم بـ 24 ساعة، وزر فوري لتنبيه المسؤول عند وجود تأخير.',
          icon: 'bell',
        },
        {
          title: 'سجل نشاط لحظي موثق',
          desc: 'متابعة فورية لكل محضر استلام مرفوع، أو مراجعة عقد حجز، أو تحديث حالة عميل في مختلف المشروعات.',
          icon: 'building',
        },
        {
          title: 'مسارات تسليم ومعاينة منظمة',
          desc: 'قوائم تحقق خطوة بخطوة ومؤشر مراحل رباعي ينقل الوحدة بسلاسة من الحجز والتعاقد وحتى تسليم المفاتيح.',
          icon: 'key',
        },
      ],
    },
    workflow: {
      kicker: 'آلية العمل',
      titlePrefix: 'من الحجز حتى تسليم المفاتيح في',
      titleHighlight: 'أربع خطوات واضحة.',
      steps: [
        {
          num: '01',
          title: 'الإسناد والتخطيط',
          desc: 'يفتح مدير المشروع أو المبيعات المهمة، ويختار نوعها (حجز، معاينة، عقد، تسليم)، ويعيّن المسؤول والفريق والموعد النهائي.',
        },
        {
          num: '02',
          title: 'التنسيق الفوري',
          desc: 'تصل المهمة فورًا إلى قناة الفريق مع تفاصيل الوحدة والعميل والموعد، لتبقى ملاحظات المبيعات والموقع في مكان واحد.',
        },
        {
          num: '03',
          title: 'التنفيذ والتوثيق',
          desc: 'يفتح المسؤول شاشة «مهامي»، وينجز خطوات قائمة المراجعة، ويرفع العقود أو محاضر الاستلام وصور المعاينة ثم يعتمد الإنجاز.',
        },
        {
          num: '04',
          title: 'القياس والمتابعة',
          desc: 'تتحدث نسب الإنجاز ومؤشرات الأداء لحظيًا أمام الإدارة، مع إبراز أي عقد أو تسليم متأخر للتعامل الفوري معه.',
        },
      ],
    },
    demoSection: {
      kicker: 'التجربة التفاعلية الحية',
      titlePrefix: 'اختبر تطبيق إدارة المشروعات',
      titleHighlight: 'بشكل حي ومباشر.',
      subtitle:
        'هذه نسخة تفاعلية كاملة وليست شاشات ثابتة. افتح تفاصيل تسليم فيلا في فيليت، وحدّث خطوات التسليم، وأضف مهمة جديدة، وتفاعل في محادثة الفريق لترى مؤشر الإنجاز يتحدث فورًا.',
      hint: 'اضغط داخل شاشة الهاتف أو اختر أي شاشة من القائمة لاستكشاف تدفق العمل',
      loadingWorkspace: 'جارٍ تحميل مساحة العمل التفاعلية...',
      guidedPrompt: 'جرّب بنفسك: افتح مهمة ← علّم على خطوات التسليم ← راجع الأداء',
      guidedStep1: 'افتح مهمة',
      guidedStep2: 'أنجز الخطوات',
      guidedStep3: 'راجع الأداء',
      prevScreenLabel: 'الشاشة السابقة',
      nextScreenLabel: 'الشاشة التالية',
      screensTablistLabel: 'شاشات العرض التجريبي',
      screenIndicatorLabel: 'مؤشر الشاشات',
      workflowStepsListLabel: 'شاشات تدفق العمل من 1 إلى 7',
      resetDemo: 'إعادة ضبط العرض',
      expandPhone: 'تكبير الهاتف',
      collapsePhone: 'تصغير الهاتف',
    },
    teamSection: {
      kicker: 'فريق الهندسة والتصميم',
      titlePrefix: 'شغف بالتنفيذ الدقيق،',
      titleHighlight: 'وتصميم يخدم الأعمال.',
      subtitle:
        'مهندسو برمجيات ومصممو تجربة مستخدم يعملون معًا لبناء منصات تشغيل موثوقة وسريعة الاستجابة لكبرى شركات التطوير العقاري.',
      photoAltPrefix: 'صورة',
    },
    contact: {
      titlePrefix: 'هل أنتم مستعدون لتوحيد عمليات',
      titleHighlight: 'المبيعات والتسليم في مشروعاتكم؟',
      subtitle:
        'يسعدنا تقديم عرض تجريبي مخصص لقيادات التطوير العقاري وفرق المشروعات مع خطة ربط وتنفيذ تتكامل مع أنظمتكم الحالية خلال أسابيع.',
      ctaButton: 'اطلب جلسة عرض وتخصيص',
      email: 'info@viaara-tech.com',
      phone1: '+20 1000 843 003',
      phone2: '+20 1000 615 819',
    },
    footer: {
      platformTag: 'منصة تشغيل الفرق العقارية',
      copyright: '© 2026 فيارا تك (VIAARA TECH). جميع الحقوق محفوظة.',
    },
    demoUi: {
      firm: {
        firmName: 'آفاق للتطوير العقاري',
        shortFirmName: 'آفاق العقارية · فريق المبيعات والتسليم',
        workspaceTag: 'آفاق العقارية · فريق المبيعات والتسليم',
        subtitle: 'إدارة المبيعات والتسليمات والمواقع',
        channelSubtitle: 'فريق المبيعات والتسليم · 6 أعضاء',
        regionBadge: 'مصر',
      },
      screens: {
        home: {
          num: '01',
          title: 'الرئيسية',
          caption: 'تابع كل موعد تسليم ومعاينة في مكان واحد.',
          headerTitle: 'الرئيسية',
        },
        tasks: {
          num: '02',
          title: 'المهام',
          caption: 'أدر حجوزات الوحدات والعقود والتسليمات عبر جميع المشروعات.',
          headerTitle: 'المهام',
        },
        'task-details': {
          num: '03',
          title: 'تفاصيل المهمة',
          caption: 'تابع كل وحدة من الحجز والتعاقد وحتى معاينة الموقع والتسليم.',
          headerTitle: 'تفاصيل المهمة',
        },
        'create-task': {
          num: '04',
          title: 'إنشاء مهمة',
          caption: 'أسند مهمة حجز أو معاينة أو تسليم للفريق في ثوانٍ.',
          headerTitle: 'إنشاء مهمة',
          subtitle: 'مهمة عقارية جديدة',
        },
        'my-task': {
          num: '05',
          title: 'مهامي',
          caption: 'نفّذ خطوات المعاينة أو التعاقد وارفع المستندات والملاحظات فورًا.',
          headerTitle: 'مهامي',
          subtitle: 'تنفيذ',
        },
        'team-chat': {
          num: '06',
          title: 'محادثة الفريق',
          caption: 'انسّق مع المبيعات والموقع وخدمة العملاء مع ربط بطاقة الوحدة.',
          headerTitle: 'محادثة الفريق',
        },
        performance: {
          num: '07',
          title: 'الأداء',
          caption: 'راقب مؤشر الإنجاز والتسليمات المتأخرة لحظيًا أمام الإدارة.',
          headerTitle: 'الأداء',
        },
      },
      navTabs: {
        ariaLabel: 'شريط التنقل السفلي للتطبيق',
        home: 'الرئيسية',
        tasks: 'المهام',
        chat: 'المحادثة',
        performance: 'الأداء',
      },
      header: {
        backLabel: 'العودة',
        notificationsLabel: 'التنبيهات',
        notificationsDialogLabel: 'تنبيهات المشروعات',
        teamNotificationsTitle: 'تنبيهات الفريق',
        markAllRead: 'تحديد الكل كمقروء',
        profileDialogLabel: 'بيانات المستخدم',
        profileButtonPrefix: 'ملف',
        shareTaskLabel: 'مشاركة المهمة في محادثة الفريق',
        workspaceSettings: 'إعدادات مساحة العمل...',
        fullVersionToast: 'متاح في النسخة الكاملة للتطبيق',
        allReadToast: 'تم تحديد جميع التنبيهات كمقروءة',
      },
      common: {
        now: 'الآن',
        todayAtPrefix: 'اليوم،',
        liveUpdate: 'تحديث فوري',
        liveAnalysis: 'تحليل حي',
        highPriority: 'أولوية عالية',
        urgent: 'عاجلة',
        mediumPriority: 'متوسطة',
        lowPriority: 'منخفضة',
        completedCheck: '✓ مكتملة',
        completed: 'مكتملة',
        inProgress: 'جاري التنفيذ',
        pending: 'قيد الانتظار',
        siteVisit: 'معاينة',
        overdue: 'متأخرة',
        client: 'العميل',
        projectSite: 'المشروع / الموقع',
        assignee: 'المسؤول',
        targetDate: 'الموعد المستهدف',
        priority: 'الأولوية',
        cancel: 'إلغاء',
        save: 'حفظ',
        delete: 'حذف',
        clear: 'مسح',
        done: 'تم',
        optional: 'اختياري',
        add: 'إضافة',
        unitCodeLabel: 'كود الوحدة:',
        defaultAssigneeLabel: 'المسؤول',
        stepsCompletedOf: (done, total) => `${done} من ${total} مكتمل`,
      },
      categories: {
        reservation: 'حجز وحدة',
        handover: 'تسليم',
        inspection: 'معاينة موقع',
        contracts: 'عقود',
        'customer-care': 'خدمة عملاء',
      },
      projects: {
        all: 'كل المشروعات',
        'east-town': 'إيست تاون',
        villette: 'فيليت',
        'west-park': 'ويست بارك',
      },
      home: {
        greeting: (firstName) => `صباح الخير، ${firstName}`,
        subtitle: 'إليك مواعيد التسليم والمعاينات التي تحتاج متابعتك اليوم.',
        createNewTaskLabel: 'إنشاء مهمة جديدة',
        hotspotText: 'جرّب الضغط هنا — هذه نسخة تفاعلية حية.',
        todaysProgressTitle: 'تقدم المشروعات اليوم',
        onTrack: 'في المسار',
        completed: 'مكتمل',
        steady: 'منتظم',
        tasksCompletedOf: (done, total) => `${done} من ${total} مهمة منجزة`,
        statCompleted: 'مكتملة',
        statInProgress: 'جاري التنفيذ',
        statPending: 'قيد الانتظار',
        quickActionsTitle: 'إجراءات سريعة',
        instantActionBadge: 'تشغيل فوري',
        quickReservation: 'حجز جديد',
        quickInspection: 'جدولة معاينة',
        quickHandover: 'مهمة تسليم',
        dailyPrioritiesTitle: 'ملخص أولويات اليوم',
        overdueInstallmentSummary: (count, amount) =>
          `يوجد ${count} قسط متأخر (${amount}) يحتاج متابعة فورية`,
        dueInstallmentsSummary: (count) =>
          `جميع الأقساط المتأخرة مسددة · ${count} دفعة مستحقة هذا الأسبوع`,
        allPaidSummary: 'جميع الأقساط والدفعات مسددة بالكامل',
        openSnagsSummary: (count) =>
          `، مع ${count} ملاحظة معاينة فنية قيد المعالجة في فيليت وويست بارك.`,
        allSnagsClosedSummary: '، وجميع ملاحظات المعاينة الفنية مغلقة وجاهزة للتسليم.',
        priorityFollowUpPrefix: 'أولوية المتابعة:',
        upcomingTasksTitle: 'المهام القادمة',
        viewUrgent: 'عرض العاجلة',
        allDoneToday: 'تم إنجاز جميع المهام المجدولة لليوم.',
        recentActivityTitle: 'النشاط الأخير',
      },
      tasks: {
        title: 'المهام',
        subtitle: 'أدر حجوزات الوحدات والعقود والتسليمات',
        searchLabel: 'بحث في المهام',
        searchPlaceholder: 'ابحث بالوحدة، المشروع، أو اسم المسؤول...',
        clearSearchLabel: 'مسح البحث',
        sortLabel: 'ترتيب وتصفية المهام',
        sortSheetLabel: 'ترتيب المهام',
        sortByTitle: 'ترتيب المهام حسب',
        sortNewest: 'الأحدث',
        sortDeadline: 'الموعد',
        sortPriority: 'الأولوية',
        projectFilterLabel: 'تصفية حسب المشروع',
        filters: {
          all: 'الكل',
          'in-progress': 'جاري التنفيذ',
          completed: 'مكتملة',
          pending: 'قيد الانتظار',
        },
        highPriorityBanner: 'عرض المهام ذات الأولوية العالية فقط',
        emptyTitle: 'لا توجد مهام مطابقة',
        emptySubtitle: 'جرّب تصفية أخرى أو امسح قيود البحث لعرض كل المشروعات.',
        showAllTasks: 'عرض كل المهام',
        createNewTaskLabel: 'إنشاء مهمة جديدة',
      },
      taskDetails: {
        shareLabel: 'مشاركة المهمة في محادثة الفريق',
        responsibleMember: 'المسؤول عن المهمة',
        installmentsTitle: 'موقف الأقساط والدفعات',
        installmentPaidBadge: 'مسددة ✓',
        installmentOverdueBadge: 'متأخر',
        installmentDueBadge: 'مستحق',
        remindedBtn: 'تم التذكير',
        sendPaymentReminderBtn: 'تذكير بالسداد',
        markPaidBtn: 'تسجيل السداد',
        snagSummaryTitle: 'ملاحظات المعاينة الفنية (السناج)',
        snagsResolvedOf: (resolved, total) =>
          `تمت معالجة ${resolved} من ${total} ملاحظات`,
        reviewSnagsBtn: 'مراجعة السناج',
        stepsTitle: 'خطوات الإنجاز',
        activityLogTitle: 'سجل المتابعة',
        taskCompletedLog: 'تم إتمام المهمة واعتمادها',
        progressPctLog: (pct) => `نسبة الإنجاز ${pct}%`,
        taskOpenedLog: (unitCode) => `تم فتح المهمة (${unitCode})`,
        messageTeamBtn: 'مراسلة الفريق',
        executionScreenBtn: 'شاشة التنفيذ',
        completedBtn: '✓ مكتملة',
        confirmCompleteBtn: 'اعتماد كمكتملة',
      },
      stepper: {
        title: 'مراحل التقدم',
      },
      documents: {
        title: (count) => `المستندات (${count})`,
        empty: 'لا توجد مستندات مرفقة حتى الآن.',
        optionsLabel: (name) => `خيارات ${name}`,
        preview: 'معاينة',
        download: 'تنزيل',
        previewToast: (name) => `معاينة ${name}`,
        downloadToast: (name) => `جارٍ تنزيل ${name}`,
        uploadAriaLabel: 'رفع عقد أو بطاقة أو محضر استلام',
        uploadTitle: 'رفع عقد حجز أو محضر استلام أو مستند',
        uploadSubtitle: 'يدعم ملفات PDF وDOCX والصور حتى 10 ميجابايت',
        uploadedStatus: 'تم الرفع',
      },
      createTask: {
        categoryTitle: 'تصنيف المهمة',
        chooseTrack: 'اختر المسار',
        requiredMark: '*',
        titleLabel: 'عنوان المهمة',
        titlePlaceholder: 'مثال: تسليم فيلا في فيليت',
        refLabel: 'رقم المرجع',
        unitCodeLabel: 'كود الوحدة',
        descLabel: 'الوصف والتعليمات',
        clientSectionTitle: 'بيانات العميل والمشروع',
        clientNameLabel: 'اسم العميل',
        clientNamePlaceholder: 'الاسم الكامل للعميل',
        compoundLabel: 'المشروع / الكمبوند',
        priorityLabel: 'درجة الأولوية',
        uploadPhotosLabel: 'رفع صور الوحدة أو المعاينة',
        uploadedPhotoAlt: (idx) => `صورة معاينة مرفوعة ${idx}`,
        removePhotoLabel: 'إزالة الصورة',
        uploadPhotosTitle: 'رفع صور الموقع أو الوحدة',
        uploadPhotosHint: 'يدعم PNG وJPEG حتى 10 ميجابايت',
        scheduleSectionTitle: 'المسؤول والمواعيد',
        assigneeLabel: 'المسؤول عن المهمة',
        teamMembersLabel: 'أعضاء الفريق المشاركون',
        addMemberBtn: 'إضافة عضو',
        createdDateLabel: 'تاريخ البدء',
        deadlineLabel: 'الموعد المستهدف',
        customDateOption: 'تاريخ مخصص...',
        customDatePlaceholder: 'مثال: الخميس 3 ديسمبر 2026',
        stepsSectionTitle: 'خطوات التنفيذ والمراجعة',
        moveUpLabel: (label) => `تحريك لأعلى: ${label}`,
        moveDownLabel: (label) => `تحريك لأسفل: ${label}`,
        removeStepLabel: (label) => `حذف الخطوة: ${label}`,
        addStepPlaceholder: 'أضف خطوة جديدة...',
        docsSectionTitle: (count) => `المستندات المرفقة (${count})`,
        maxFileSize: 'حتى 10 ميجابايت',
        uploadDocAriaLabel: 'رفع عقد أو بطاقة أو محضر',
        uploadDocTitle: 'رفع عقد حجز أو محضر استلام',
        uploadDocHint: 'يدعم PDF وDOCX والصور',
        alertsSectionTitle: 'التنبيهات والتحديثات التلقائية',
        clientUpdateTitle: 'إرسال تحديث فوري للعميل',
        clientUpdateSubtitle: (client) => `إشعار ${client} برقم الوحدة والخطوة التالية`,
        clientUpdateSwitchLabel: 'تفعيل التحديث الفوري للعميل',
        alert24hTitle: 'تنبيه قبل الموعد بـ 24 ساعة',
        alert24hSubtitle: 'تنبيه المسؤول قبل موعد المعاينة أو التسليم',
        alert24hSwitchLabel: 'تفعيل تنبيه الـ 24 ساعة',
        submitBtn: 'إسناد المهمة',
        errors: {
          title: 'يرجى إدخال عنوان المهمة.',
          clientName: 'يرجى إدخال اسم العميل.',
          assigneeId: 'يرجى اختيار المسؤول عن المهمة.',
          deadline: 'يرجى تحديد الموعد النهائي.',
        },
        defaults: {
          clientName: 'السيدة منى عادل',
          createdDate: 'الأربعاء 18 نوفمبر 2026',
          deadlinePreset: 'الخميس 27 نوفمبر 2026',
          deadlinePresets: [
            'الخميس 27 نوفمبر 2026',
            'الإثنين 30 نوفمبر 2026',
            'الأربعاء 2 ديسمبر 2026',
          ],
          defaultSteps: [
            'مراجعة مستندات العميل',
            'سداد الدفعة الأخيرة',
            'معاينة الوحدة مع العميل',
            'توقيع محضر الاستلام',
            'تسليم المفاتيح',
          ],
          fallbackStep: 'مراجعة بيانات الوحدة والعميل',
          fallbackUnitType: 'وحدة سكنية · 280 م²',
          fallbackPriceEgp: '14,500,000 ج.م',
          reservationInstallment: 'دفعة جدية الحجز',
          dueInstallment: 'الدفعة المستحقة',
          reservationAmount: '300,000 ج.م',
          dueAmount: '850,000 ج.م',
          docStatusUploaded: 'تم الرفع',
          docStatusVerified: 'موثّق',
          docStatusReady: 'جاهز',
          docNames: ['عقد_الحجز.pdf', 'بطاقة_الرقم_القومي.pdf', 'محضر_الاستلام.doc'],
        },
      },
      myTask: {
        assignedScreenSubtitle: 'شاشة تنفيذ المهمة المسندة',
        taskOptionsLabel: 'خيارات المهمة',
        shareLabel: 'مشاركة المهمة في المحادثة',
        executionStepsTitle: 'خطوات التنفيذ',
        snagCardTitle: 'ملاحظات المعاينة الفنية (Snag List)',
        addSnagBtn: 'إضافة بند',
        snagPlaceholder: 'مثال: ضبط مفصلة شباك الغرفة الرئيسية...',
        snagAreaLabel: 'منطقة الملاحظة',
        snagAreas: ['الاستقبال', 'الدور الأرضي', 'الدور الأول', 'الواجهة', 'الحديقة'],
        saveSnagBtn: 'تسجيل الملاحظة',
        noSnagsMessage:
          'لا توجد ملاحظات فنية مسجلة لهذه الوحدة حاليًا. اضغط «إضافة بند» لتوثيق أي ملاحظة.',
        snagsFixedCount: (resolved, total) => `تم الإصلاح: ${resolved} من ${total}`,
        tapToToggleStatus: 'اضغط لتغيير الحالة',
        snagFixed: 'تم الإصلاح',
        snagPending: 'قيد المعالجة',
        notesTitle: 'ملاحظات المتابعة',
        addNoteBtn: 'إضافة ملاحظة',
        notePlaceholder: 'اكتب ملاحظة حول المعاينة أو التعاقد...',
        saveNoteBtn: 'حفظ الملاحظة',
        notesEmptyPrompt: 'اضغط هنا لإضافة ملاحظة حول حالة الوحدة أو تواصل العميل...',
        photoAriaLabel: 'إرفاق صور معاينة الوحدة',
        photoAlt: (idx) => `صورة معاينة ${idx}`,
        removePhotoLabel: 'إزالة الصورة',
        attachPhotosTitle: 'إرفاق صور المعاينة',
        attachPhotosHint: 'JPG أو PNG للمعاينة الميدانية',
        incompleteTitle: 'يرجى إتمام جميع الخطوات قبل الاعتماد',
        incompleteBody: (remaining) => `تتبقى ${remaining} خطوة غير مكتملة أعلاه. علّم عليها أو`,
        completeAllAction: 'اعتماد الكل وإرسال المهمة',
        deliveredBtn: 'تم التسليم ✓',
        confirmSubmitBtn: 'تأكيد وإتمام المهمة',
        remainingStepsToast: (remaining) =>
          `يرجى إتمام الخطوات المتبقية (${remaining}) أولاً`,
      },
      teamChat: {
        verifiedChannelLabel: 'قناة موثقة',
        chatOptionsLabel: 'خيارات المحادثة',
        chatActionsLabel: 'إجراءات المحادثة',
        backToHome: 'العودة للرئيسية',
        todayBadge: 'اليوم',
        attachedTaskLabel: 'مهمة مرفقة',
        viewDetails: 'عرض التفاصيل',
        saraTyping: 'سارة تكتب…',
        emojiDialogLabel: 'اختيار رمز تعبيري',
        takePhotoLabel: 'التقاط صورة',
        attachFileLabel: 'إرفاق ملف',
        composerPlaceholder: 'اكتب رسالة للفريق...',
        composerAriaLabel: 'رسالة للفريق',
        insertEmojiLabel: 'إدراج رمز تعبيري',
        sendMessageLabel: 'إرسال الرسالة',
      },
      performance: {
        periodAriaLabel: 'الفترة الزمنية للأداء',
        periods: {
          today: 'اليوم',
          week: 'هذا الأسبوع',
          month: 'هذا الشهر',
        },
        progressIndexTitle: 'مؤشر الإنجاز',
        projectCompletionTitle: 'اكتمال مهام المشروعات',
        tasksOnSchedule: (done, total) => `${done} من ${total} مهمة في الموعد`,
        collectionsTitle: 'تحصيل الأقساط',
        installmentsPaidOf: (paid, total) => `${paid} من ${total} مسددة`,
        overdueInstallmentAction: 'قسط متأخر · اضغط للمراجعة',
        collectionsSteady: 'التحصيل منتظم ✓',
        inspectionReadinessTitle: 'جاهزية المعاينات',
        snagsFixedOf: (resolved, total) => `${resolved} من ${total} سناج مُعالج`,
        needsAttentionTitle: 'يحتاج انتباه',
        remindedBtn: 'تم إرسال التذكير',
        sendReminderBtn: 'إرسال تذكير',
        noOverdueMessage: 'لا توجد مهام متأخرة — جميع التسليمات والعقود تسير وفق الجدول!',
        activeTasksTitle: 'المهام النشطة',
        tasksCountPill: (count) => `${count} مهام`,
        viewAllBtn: 'عرض الكل',
        teamPerformanceTitle: 'أداء الفريق',
        activeMembersCount: (count) => `${count} أعضاء نشطين`,
        memberProgressOnTime: (role, done, total) => `${role} · ${done} / ${total} في الموعد`,
      },
      shareSheet: {
        closeLabel: 'إغلاق نافذة المشاركة',
        title: 'مشاركة في محادثة الفريق',
        noteAriaLabel: 'ملاحظة اختيارية للفريق',
        notePlaceholder: 'أضف ملاحظة للفريق (اختياري)',
        sendBtn: 'إرسال إلى المحادثة',
      },
      toasts: {
        resetDemo: 'تمت إعادة ضبط العرض التجريبي',
        assignedTo: (name) => `تم إسناد المهمة إلى ${name}`,
        taskCompleted: (title) => `تمت المهمة: ${title}`,
        allStepsDone: 'تم إكمال جميع الخطوات واعتماد المهمة!',
        noteAdded: 'تمت إضافة ملاحظة المتابعة',
        photoAttached: 'تم إرفاق صورة المعاينة',
        docUploaded: (name) => `تم رفع ${name}`,
        docRemoved: 'تم حذف المستند',
        installmentPaid: 'تم تسجيل سداد القسط وتحديث الأداء',
        installmentReminderSent: (client) => `تم إرسال تذكير السداد إلى ${client}`,
        snagResolved: 'تم تعليم الملاحظة كتم الإصلاح',
        snagReopened: 'أُعيدت الملاحظة للمعالجة',
        snagAdded: 'تمت إضافة ملاحظة المعاينة الفنية',
        sharedAgain: 'تمت المشاركة مجددًا',
        sharedToChat: 'تمت مشاركة المهمة في محادثة الفريق',
        openChat: 'فتح المحادثة',
        attachedToChat: 'تم إرفاق المهمة في محادثة الفريق',
        reminderSentTo: (name) => `تم إرسال التذكير إلى ${name}`,
      },
      events: {
        assignedDetail: (name, ref) => `أُسندت إلى ${name} · مرجع ${ref}`,
        completedSummary: (name) => `${name} أتمّ المهمة`,
        completedDetail: (title) => `تم اعتماد ${title} وإغلاقها`,
        allStepsVerified: 'تم التحقق من جميع خطوات التسليم والمراجعة',
        installmentCollectedSummary: (label) => `تحصيل ${label}`,
        installmentPaidNow: 'تم السداد الآن',
        installmentReminderSummary: (client) => `تم إرسال تذكير سداد إلى ${client}`,
        snagClosedSummary: 'تم إغلاق ملاحظة فنية',
        snagReopenedSummary: 'إعادة فتح ملاحظة فنية',
        snagAddedSummary: 'إضافة ملاحظة معاينة فنية',
        sharedSummary: (user, title) => `${user} شارك ${title} في المحادثة`,
        reminderSummary: (name) => `تم إرسال تذكير إلى ${name}`,
        reminderDetailOverdue: 'تنبيه عاجل بخصوص: متابعة عميل - عقد تمليك',
        shareReplyAgain: (ref) =>
          `تم الاستلام يا أستاذ أحمد — أراجع التحديث الجديد على ${ref} الآن.`,
        shareReplyFirst: 'شكرًا أستاذ أحمد، سأراجع التفاصيل مع العميل فورًا.',
        fallbackCompletedTitle: 'المهمة',
      },
    },
  },

  en: {
    meta: {
      title: 'VIAARA TECH — Real Estate Sales, Handover & Project Operations Platform',
      description:
        'VIAARA TECH delivers a unified digital operations workspace for real estate developers to manage project launches, unit reservations, villa handovers, site inspections, contract reviews, and live client follow-ups.',
      ogTitle: 'VIAARA TECH — Real Estate Sales, Handover & Project Operations Platform',
      ogDescription:
        'End-to-end operational visibility for real estate sales, handover, site engineering, and customer care teams in real time.',
    },
    brand: {
      viaaraHomeLabel: 'VIAARA TECH — Home',
      viaaraBackToTopLabel: 'VIAARA TECH — Back to top',
      viaaraLogoAlt: 'VIAARA TECH Logo',
      countryBadge: 'Egypt',
    },
    nav: {
      mainAriaLabel: 'Primary navigation',
      mobileAriaLabel: 'Mobile menu',
      openMenuLabel: 'Open menu',
      closeMenuLabel: 'Close menu',
      languageSwitcherLabel: 'Change language / تغيير اللغة',
      about: 'About',
      app: 'Platform',
      workflow: 'How It Works',
      demo: 'Live Demo',
      team: 'Team',
      contact: 'Contact Us',
    },
    hero: {
      badge: 'Interactive Showcase · Real Estate Operations Platform',
      titlePrefix: 'Manage every launch, unit, and handover,',
      titleHighlight: 'in real-time harmony.',
      description:
        'VIAARA TECH built a unified operations platform giving real estate leadership and project managers live visibility across unit reservations, handovers, site inspections, contract reviews, and client follow-ups from one screen.',
      tryDemo: 'Try the Live Demo',
      aboutViaara: 'About VIAARA TECH',
      stats: [
        { value: '50+', label: 'Digital projects delivered' },
        { value: '20+', label: 'Enterprise & developer partnerships' },
        { value: '100%', label: 'Real-time sync between sales & site' },
      ],
    },
    about: {
      kicker: 'About VIAARA TECH',
      titlePrefix: 'Software engineering built for',
      titleHighlight: 'measurable operational impact.',
      p1Bold: 'VIAARA TECH',
      p1Rest:
        ' is an enterprise software engineering studio turning complex field and commercial workflows into fast, secure, and scalable digital products.',
      p2: 'Since 2021, we have architected bespoke operating platforms and mobile apps for leading enterprises and real estate developers—combining deep engineering rigor with practical field understanding from discovery to rollout and ongoing support.',
      services: [
        {
          title: 'Custom Enterprise Software',
          desc: 'Flexible platforms tailored to match the exact reservation, contract, and handover workflows inside your teams.',
          icon: 'code',
        },
        {
          title: 'Web & Mobile Applications',
          desc: 'High-speed iOS, Android, and web apps keeping site engineers and sales offices aligned on the move.',
          icon: 'smartphone',
        },
        {
          title: 'Product & UX Design',
          desc: 'Intuitive bilingual interfaces engineered for clarity, faster execution, and minimal input errors.',
          icon: 'palette',
        },
        {
          title: 'Cloud Infrastructure & Integrations',
          desc: 'Secure, resilient API integrations connecting seamlessly with your existing ERP, CRM, and client databases.',
          icon: 'cloud',
        },
        {
          title: 'Automation & Reliability',
          desc: 'Automated deployment pipelines and resilient cloud operations built to handle peak launch demand.',
          icon: 'workflow',
        },
        {
          title: 'AI & Operational Analytics',
          desc: 'Proactive bottleneck alerts and smart KPIs that help leadership spot delays before they affect handover.',
          icon: 'brain',
        },
      ],
    },
    product: {
      kicker: 'Proposed Real Estate Platform',
      titlePrefix: 'Sales & Handover Workspace —',
      titleHighlight: 'complete clarity across real estate operations.',
      subtitle:
        'A dedicated execution workspace crafted for project directors, sales managers, site engineers, contracts officers, and customer care teams. It replaces fragmented chats and manual spreadsheets with structured workflows for unit reservations, site inspections, ownership contracts, and villa handovers.',
      problemTitle: 'Daily Operational Challenges',
      problems: [
        'Handover dates, inspection slots, and client requests scattered across emails, private chats, and spreadsheets',
        'Sales and project managers spending hours chasing contracts officers and site engineers for unit status updates',
        'Late discovery of pending contract reviews or unresolved snag items that jeopardize scheduled key handovers',
      ],
      solutionTitle: 'The Unified Solution by VIAARA TECH',
      solutionHeading:
        'One single source of truth for real estate operations — every reservation, site inspection, and unit handover is tied to an owner, deadline, live milestone, documents, and team thread.',
      solutionBody:
        'Managers stop chasing status updates manually. Every person across sales, site engineering, and customer care knows their exact next action while leadership monitors real-time compound progress.',
      features: [
        {
          title: 'Smart Unit & Task Assignment',
          desc: 'Launch a reservation, villa handover, site inspection, or contract review task with owner, priority, and due date in seconds.',
          icon: 'clipboard',
        },
        {
          title: 'Unit-Linked Team Chat',
          desc: 'A dedicated channel across sales, handover, and site teams where live unit cards can be shared directly into the conversation.',
          icon: 'chat',
        },
        {
          title: 'Live Executive Progress Index',
          desc: 'Instant completion metrics across Today, This Week, and This Month alongside individual progress bars for every team member.',
          icon: 'chart',
        },
        {
          title: 'Proactive Deadline Alerts',
          desc: 'Automated 24-hour alerts before inspections or handovers, plus one-tap reminders whenever follow-up slips.',
          icon: 'bell',
        },
        {
          title: 'Verified Live Activity Log',
          desc: 'Real-time audit trail of every uploaded handover report, contract approval, snag fix, and client update across compounds.',
          icon: 'building',
        },
        {
          title: 'Structured Handover Pipelines',
          desc: 'Step-by-step checklists and a 4-stage milestone stepper taking each unit smoothly from reservation to key handover.',
          icon: 'key',
        },
      ],
    },
    workflow: {
      kicker: 'How It Works',
      titlePrefix: 'From reservation to key handover in',
      titleHighlight: 'four clear steps.',
      steps: [
        {
          num: '01',
          title: 'Assign & Plan',
          desc: 'A project or sales manager opens a task, selects its track (Reservation, Inspection, Contract, Handover), and sets the owner and deadline.',
        },
        {
          num: '02',
          title: 'Instant Alignment',
          desc: 'The unit card arrives immediately in the team channel with client details and schedule so sales and site notes stay together.',
        },
        {
          num: '03',
          title: 'Execute & Document',
          desc: 'The assignee opens My Task, completes checklist steps, logs snags or uploads contracts and site photos, and submits completion.',
        },
        {
          num: '04',
          title: 'Measure & Act',
          desc: 'Completion percentages and KPIs update in real time for leadership, flagging any overdue contract or installment for immediate action.',
        },
      ],
    },
    demoSection: {
      kicker: 'Interactive Live Prototype',
      titlePrefix: 'Experience the workspace app',
      titleHighlight: 'live in action.',
      subtitle:
        'This is a fully interactive working prototype—not static screens. Open the Villa Handover in Villette, tick checklist steps, add a new unit task, and message the team to watch the Progress Index update live.',
      hint: 'Interact inside the phone screen or select any step to explore the end-to-end workflow',
      loadingWorkspace: 'Loading interactive workspace...',
      guidedPrompt: 'Try it yourself: Open a task → Complete handover steps → Review performance',
      guidedStep1: 'Open a task',
      guidedStep2: 'Complete steps',
      guidedStep3: 'Check performance',
      prevScreenLabel: 'Previous screen',
      nextScreenLabel: 'Next screen',
      screensTablistLabel: 'Demo screens',
      screenIndicatorLabel: 'Screen pagination',
      workflowStepsListLabel: 'Workflow screens 1 to 7',
      resetDemo: 'Reset Demo',
      expandPhone: 'Expand Phone',
      collapsePhone: 'Compact Phone',
    },
    teamSection: {
      kicker: 'Engineering & Design Team',
      titlePrefix: 'Driven by craft,',
      titleHighlight: 'engineered for scale.',
      subtitle:
        'Software engineers and product designers partnering closely to ship reliable, high-speed operational platforms for leading real estate developers.',
      photoAltPrefix: 'Portrait of',
    },
    contact: {
      titlePrefix: 'Ready to unify sales and handover operations',
      titleHighlight: 'across your projects?',
      subtitle:
        'We would be delighted to host a tailored walkthrough for your leadership and project teams with an integration roadmap aligned to your systems within weeks.',
      ctaButton: 'Request a Custom Walkthrough',
      email: 'info@viaara-tech.com',
      phone1: '+20 1000 843 003',
      phone2: '+20 1000 615 819',
    },
    footer: {
      platformTag: 'Real Estate Operations Platform',
      copyright: '© 2026 VIAARA TECH. All rights reserved.',
    },
    demoUi: {
      firm: {
        firmName: 'Afaq Developments',
        shortFirmName: 'Afaq Developments · Sales & Handover Team',
        workspaceTag: 'Afaq Developments · Sales & Handover Team',
        subtitle: 'Sales, Handover & Site Operations',
        channelSubtitle: 'Sales & Handover Team · 6 members',
        regionBadge: 'Egypt',
      },
      screens: {
        home: {
          num: '01',
          title: 'Home',
          caption: 'Track every handover milestone and site visit in one view.',
          headerTitle: 'Home',
        },
        tasks: {
          num: '02',
          title: 'Tasks',
          caption: 'Manage reservations, contracts, and handovers across all projects.',
          headerTitle: 'Tasks',
        },
        'task-details': {
          num: '03',
          title: 'Task Details',
          caption: 'Follow every unit from reservation and contracting through inspection and handover.',
          headerTitle: 'Task Details',
        },
        'create-task': {
          num: '04',
          title: 'Create Task',
          caption: 'Assign a reservation, inspection, or handover task to your team in seconds.',
          headerTitle: 'Create Task',
          subtitle: 'New real estate task',
        },
        'my-task': {
          num: '05',
          title: 'My Task',
          caption: 'Complete inspection steps, resolve snags, and upload reports immediately.',
          headerTitle: 'My Task',
          subtitle: 'Execution',
        },
        'team-chat': {
          num: '06',
          title: 'Team Chat',
          caption: 'Coordinate across sales, site, and customer care with linked unit cards.',
          headerTitle: 'Team Chat',
        },
        performance: {
          num: '07',
          title: 'Performance',
          caption: 'Monitor the live Progress Index and overdue deliverables at a glance.',
          headerTitle: 'Performance',
        },
      },
      navTabs: {
        ariaLabel: 'Bottom app navigation',
        home: 'Home',
        tasks: 'Tasks',
        chat: 'Chat',
        performance: 'Performance',
      },
      header: {
        backLabel: 'Back',
        notificationsLabel: 'Notifications',
        notificationsDialogLabel: 'Project notifications',
        teamNotificationsTitle: 'Team Notifications',
        markAllRead: 'Mark all as read',
        profileDialogLabel: 'User profile',
        profileButtonPrefix: 'Profile of',
        shareTaskLabel: 'Share task in team chat',
        workspaceSettings: 'Workspace settings...',
        fullVersionToast: 'Available in the full production app',
        allReadToast: 'All notifications marked as read',
      },
      common: {
        now: 'Just now',
        todayAtPrefix: 'Today,',
        liveUpdate: 'Live sync',
        liveAnalysis: 'Live view',
        highPriority: 'High Priority',
        urgent: 'Urgent',
        mediumPriority: 'Medium',
        lowPriority: 'Low',
        completedCheck: '✓ Completed',
        completed: 'Completed',
        inProgress: 'In Progress',
        pending: 'Pending',
        siteVisit: 'Inspection',
        overdue: 'Overdue',
        client: 'Client',
        projectSite: 'Project / Site',
        assignee: 'Assignee',
        targetDate: 'Target Date',
        priority: 'Priority',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        clear: 'Clear',
        done: 'Done',
        optional: 'optional',
        add: 'Add',
        unitCodeLabel: 'Unit Code:',
        defaultAssigneeLabel: 'Assignee',
        stepsCompletedOf: (done, total) => `${done} of ${total} completed`,
      },
      categories: {
        reservation: 'Unit Reservation',
        handover: 'Handover',
        inspection: 'Site Inspection',
        contracts: 'Contracts',
        'customer-care': 'Customer Service',
      },
      projects: {
        all: 'All Projects',
        'east-town': 'East Town',
        villette: 'Villette',
        'west-park': 'West Park',
      },
      home: {
        greeting: (firstName) => `Good morning, ${firstName}`,
        subtitle: "Here are today's handovers and site inspections requiring your attention.",
        createNewTaskLabel: 'Create new task',
        hotspotText: 'Tap here to test — this is a live interactive prototype.',
        todaysProgressTitle: "Today's Project Progress",
        onTrack: 'On Track',
        completed: 'Completed',
        steady: 'Steady',
        tasksCompletedOf: (done, total) => `${done} of ${total} tasks completed`,
        statCompleted: 'Completed',
        statInProgress: 'In Progress',
        statPending: 'Pending',
        quickActionsTitle: 'Quick Actions',
        instantActionBadge: 'Instant launch',
        quickReservation: 'New Booking',
        quickInspection: 'Book Inspection',
        quickHandover: 'Handover Task',
        dailyPrioritiesTitle: "Today's Priority Brief",
        overdueInstallmentSummary: (count, amount) =>
          `${count} overdue installment (${amount}) requires immediate follow-up`,
        dueInstallmentsSummary: (count) =>
          `All overdue installments cleared · ${count} payments due this week`,
        allPaidSummary: 'All installments are fully settled',
        openSnagsSummary: (count) =>
          `, with ${count} open inspection snags across Villette and West Park.`,
        allSnagsClosedSummary: ', and all inspection snags are resolved and handover-ready.',
        priorityFollowUpPrefix: 'Top Priority:',
        upcomingTasksTitle: 'Upcoming Tasks',
        viewUrgent: 'View Urgent',
        allDoneToday: 'All scheduled tasks for today are completed.',
        recentActivityTitle: 'Recent Activity',
      },
      tasks: {
        title: 'Tasks',
        subtitle: 'Manage unit reservations, contracts, and handovers',
        searchLabel: 'Search tasks',
        searchPlaceholder: 'Search by unit, compound, or assignee...',
        clearSearchLabel: 'Clear search',
        sortLabel: 'Sort & filter tasks',
        sortSheetLabel: 'Sort tasks',
        sortByTitle: 'Sort tasks by',
        sortNewest: 'Newest',
        sortDeadline: 'Due Date',
        sortPriority: 'Priority',
        projectFilterLabel: 'Filter by project',
        filters: {
          all: 'All',
          'in-progress': 'In Progress',
          completed: 'Completed',
          pending: 'Pending',
        },
        highPriorityBanner: 'Showing high-priority tasks only',
        emptyTitle: 'No matching tasks found',
        emptySubtitle: 'Try another filter or clear search criteria to view all projects.',
        showAllTasks: 'Show all tasks',
        createNewTaskLabel: 'Create new task',
      },
      taskDetails: {
        shareLabel: 'Share task to team chat',
        responsibleMember: 'Task Owner',
        installmentsTitle: 'Installments & Payment Status',
        installmentPaidBadge: 'Paid ✓',
        installmentOverdueBadge: 'Overdue',
        installmentDueBadge: 'Due',
        remindedBtn: 'Reminder Sent',
        sendPaymentReminderBtn: 'Payment Reminder',
        markPaidBtn: 'Record Payment',
        snagSummaryTitle: 'Site Inspection Snag List',
        snagsResolvedOf: (resolved, total) => `${resolved} of ${total} snags resolved`,
        reviewSnagsBtn: 'Review Snags',
        stepsTitle: 'Checklist Steps',
        activityLogTitle: 'Follow-up Log',
        taskCompletedLog: 'Task completed and approved',
        progressPctLog: (pct) => `Progress updated to ${pct}%`,
        taskOpenedLog: (unitCode) => `Task opened (${unitCode})`,
        messageTeamBtn: 'Message Team',
        executionScreenBtn: 'Execution View',
        completedBtn: '✓ Completed',
        confirmCompleteBtn: 'Approve & Complete',
      },
      stepper: {
        title: 'Milestone Progress',
      },
      documents: {
        title: (count) => `Documents (${count})`,
        empty: 'No documents attached yet.',
        optionsLabel: (name) => `Options for ${name}`,
        preview: 'Preview',
        download: 'Download',
        previewToast: (name) => `Previewing ${name}`,
        downloadToast: (name) => `Downloading ${name}`,
        uploadAriaLabel: 'Upload reservation contract, ID, or handover report',
        uploadTitle: 'Upload contract, handover report, or file',
        uploadSubtitle: 'Supports PDF, DOCX & images up to 10 MB',
        uploadedStatus: 'Uploaded',
      },
      createTask: {
        categoryTitle: 'Task Category',
        chooseTrack: 'Select track',
        requiredMark: '*',
        titleLabel: 'Task Title',
        titlePlaceholder: 'e.g. Villa Handover – Villette',
        refLabel: 'Reference No.',
        unitCodeLabel: 'Unit Code',
        descLabel: 'Description & Notes',
        clientSectionTitle: 'Client & Compound Details',
        clientNameLabel: 'Client Name',
        clientNamePlaceholder: 'Full client name',
        compoundLabel: 'Project / Compound',
        priorityLabel: 'Priority Level',
        uploadPhotosLabel: 'Upload unit or inspection photos',
        uploadedPhotoAlt: (idx) => `Uploaded inspection photo ${idx}`,
        removePhotoLabel: 'Remove photo',
        uploadPhotosTitle: 'Upload site or unit photos',
        uploadPhotosHint: 'Supports PNG & JPEG up to 10 MB',
        scheduleSectionTitle: 'Owner & Timeline',
        assigneeLabel: 'Task Owner',
        teamMembersLabel: 'Participating Team Members',
        addMemberBtn: 'Add member',
        createdDateLabel: 'Start Date',
        deadlineLabel: 'Target Deadline',
        customDateOption: 'Custom date...',
        customDatePlaceholder: 'e.g. Thursday, 3 Dec 2026',
        stepsSectionTitle: 'Execution & Review Checklist',
        moveUpLabel: (label) => `Move up: ${label}`,
        moveDownLabel: (label) => `Move down: ${label}`,
        removeStepLabel: (label) => `Remove step: ${label}`,
        addStepPlaceholder: 'Add a new step...',
        docsSectionTitle: (count) => `Attached Documents (${count})`,
        maxFileSize: 'Up to 10 MB',
        uploadDocAriaLabel: 'Upload contract, ID, or report',
        uploadDocTitle: 'Upload reservation contract or handover report',
        uploadDocHint: 'Supports PDF, DOCX & images',
        alertsSectionTitle: 'Automated Alerts & Updates',
        clientUpdateTitle: 'Send live update to client',
        clientUpdateSubtitle: (client) => `Notify ${client} with unit code & next step`,
        clientUpdateSwitchLabel: 'Enable instant client updates',
        alert24hTitle: '24-hour deadline reminder',
        alert24hSubtitle: 'Alert assignee 24h before inspection or handover',
        alert24hSwitchLabel: 'Enable 24-hour reminder',
        submitBtn: 'Assign Task',
        errors: {
          title: 'Please enter a task title.',
          clientName: 'Please enter the client name.',
          assigneeId: 'Please select a task owner.',
          deadline: 'Please set a target deadline.',
        },
        defaults: {
          clientName: 'Ms. Mona Adel',
          createdDate: 'Wednesday, 18 Nov 2026',
          deadlinePreset: 'Thursday, 27 Nov 2026',
          deadlinePresets: [
            'Thursday, 27 Nov 2026',
            'Monday, 30 Nov 2026',
            'Wednesday, 2 Dec 2026',
          ],
          defaultSteps: [
            'Review client documents',
            'Pay final installment',
            'Inspect the unit with the client',
            'Sign the handover report',
            'Hand over the keys',
          ],
          fallbackStep: 'Review unit & client documentation',
          fallbackUnitType: 'Residential Unit · 280 sqm',
          fallbackPriceEgp: 'EGP 14,500,000',
          reservationInstallment: 'Reservation Deposit',
          dueInstallment: 'Scheduled Installment',
          reservationAmount: 'EGP 300,000',
          dueAmount: 'EGP 850,000',
          docStatusUploaded: 'Uploaded',
          docStatusVerified: 'Verified',
          docStatusReady: 'Ready',
          docNames: [
            'Reservation_Contract.pdf',
            'National_ID.pdf',
            'Handover_Report.doc',
          ],
        },
      },
      myTask: {
        assignedScreenSubtitle: 'Assigned Task Execution',
        taskOptionsLabel: 'Task options',
        shareLabel: 'Share task in chat',
        executionStepsTitle: 'Execution Checklist',
        snagCardTitle: 'Site Inspection Snag List',
        addSnagBtn: 'Add Item',
        snagPlaceholder: 'e.g. Adjust master bedroom window hinge...',
        snagAreaLabel: 'Inspection area',
        snagAreas: ['Reception', 'Ground Floor', 'First Floor', 'Facade', 'Garden'],
        saveSnagBtn: 'Log Snag',
        noSnagsMessage:
          'No inspection snags logged for this unit yet. Tap "Add Item" to record one.',
        snagsFixedCount: (resolved, total) => `Resolved: ${resolved} of ${total}`,
        tapToToggleStatus: 'Tap to toggle status',
        snagFixed: 'Resolved',
        snagPending: 'In Progress',
        notesTitle: 'Follow-up Notes',
        addNoteBtn: 'Add Note',
        notePlaceholder: 'Write a note on site inspection or contract status...',
        saveNoteBtn: 'Save Note',
        notesEmptyPrompt: 'Tap here to add a unit inspection or client follow-up note...',
        photoAriaLabel: 'Attach unit inspection photos',
        photoAlt: (idx) => `Inspection photo ${idx}`,
        removePhotoLabel: 'Remove photo',
        attachPhotosTitle: 'Attach inspection photos',
        attachPhotosHint: 'JPG or PNG for site documentation',
        incompleteTitle: 'Please complete all checklist steps first',
        incompleteBody: (remaining) =>
          `${remaining} checklist steps remain above. Tick them or`,
        completeAllAction: 'complete all and submit task',
        deliveredBtn: 'Handed Over ✓',
        confirmSubmitBtn: 'Confirm & Complete Task',
        remainingStepsToast: (remaining) =>
          `Please complete the remaining ${remaining} steps first`,
      },
      teamChat: {
        verifiedChannelLabel: 'Verified channel',
        chatOptionsLabel: 'Chat options',
        chatActionsLabel: 'Chat actions',
        backToHome: 'Back to Home',
        todayBadge: 'Today',
        attachedTaskLabel: 'Linked Task',
        viewDetails: 'View Details',
        saraTyping: 'Sara is typing…',
        emojiDialogLabel: 'Choose emoji',
        takePhotoLabel: 'Take photo',
        attachFileLabel: 'Attach file',
        composerPlaceholder: 'Message the team...',
        composerAriaLabel: 'Message the team',
        insertEmojiLabel: 'Insert emoji',
        sendMessageLabel: 'Send message',
      },
      performance: {
        periodAriaLabel: 'Performance time range',
        periods: {
          today: 'Today',
          week: 'This Week',
          month: 'This Month',
        },
        progressIndexTitle: 'Progress Index',
        projectCompletionTitle: 'Project Tasks Completed',
        tasksOnSchedule: (done, total) => `${done} of ${total} tasks on schedule`,
        collectionsTitle: 'Installment Collection',
        installmentsPaidOf: (paid, total) => `${paid} of ${total} paid`,
        overdueInstallmentAction: 'Overdue · Tap to review',
        collectionsSteady: 'Collections on track ✓',
        inspectionReadinessTitle: 'Inspection Readiness',
        snagsFixedOf: (resolved, total) => `${resolved} of ${total} snags fixed`,
        needsAttentionTitle: 'Needs Attention',
        remindedBtn: 'Reminder Sent',
        sendReminderBtn: 'Send Reminder',
        noOverdueMessage: 'No overdue tasks — all handovers and contracts are on schedule!',
        activeTasksTitle: 'Active Tasks',
        tasksCountPill: (count) => `${count} tasks`,
        viewAllBtn: 'View All',
        teamPerformanceTitle: 'Team Performance',
        activeMembersCount: (count) => `${count} active members`,
        memberProgressOnTime: (role, done, total) => `${role} · ${done} / ${total} on time`,
      },
      shareSheet: {
        closeLabel: 'Close share sheet',
        title: 'Share to Team Chat',
        noteAriaLabel: 'Optional note for the team',
        notePlaceholder: 'Add a note for the team (optional)',
        sendBtn: 'Send to Chat',
      },
      toasts: {
        resetDemo: 'Demo workspace has been reset',
        assignedTo: (name) => `Task assigned to ${name}`,
        taskCompleted: (title) => `Completed: ${title}`,
        allStepsDone: 'All steps completed and task approved!',
        noteAdded: 'Follow-up note added',
        photoAttached: 'Inspection photo attached',
        docUploaded: (name) => `Uploaded ${name}`,
        docRemoved: 'Document removed',
        installmentPaid: 'Installment recorded and Performance updated',
        installmentReminderSent: (client) => `Payment reminder sent to ${client}`,
        snagResolved: 'Snag marked as resolved',
        snagReopened: 'Snag reopened for review',
        snagAdded: 'Inspection snag logged',
        sharedAgain: 'Shared again to chat',
        sharedToChat: 'Task shared to team chat',
        openChat: 'Open Chat',
        attachedToChat: 'Task card attached in team chat',
        reminderSentTo: (name) => `Reminder sent to ${name}`,
      },
      events: {
        assignedDetail: (name, ref) => `Assigned to ${name} · Ref ${ref}`,
        completedSummary: (name) => `${name} completed the task`,
        completedDetail: (title) => `${title} approved and closed`,
        allStepsVerified: 'All handover & review checklist steps verified',
        installmentCollectedSummary: (label) => `Collected: ${label}`,
        installmentPaidNow: 'Paid just now',
        installmentReminderSummary: (client) => `Payment reminder sent to ${client}`,
        snagClosedSummary: 'Inspection snag resolved',
        snagReopenedSummary: 'Inspection snag reopened',
        snagAddedSummary: 'New inspection snag logged',
        sharedSummary: (user, title) => `${user} shared ${title} in chat`,
        reminderSummary: (name) => `Reminder sent to ${name}`,
        reminderDetailOverdue: 'Urgent alert: Customer Follow-up – Ownership Contract',
        shareReplyAgain: (ref) =>
          `Received, Ahmed — reviewing the latest update on ${ref} now.`,
        shareReplyFirst: "Thanks Ahmed, I'll follow up with the client right away.",
        fallbackCompletedTitle: 'Task',
      },
    },
  },
};
