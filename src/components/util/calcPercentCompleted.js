export const calcPercentCompleted = (subtasks) => {
    const percent =
      (subtasks.filter((s) => s.completed).length / subtasks.length) * 100;
    return Math.round(percent);
  };
