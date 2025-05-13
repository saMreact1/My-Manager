export interface Task {
    _id?: string;
    title: string;
    description: string;
    status: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    timeline: {
        startDate: Date;
        endDate: Date;
    },
    assignedTo: string
}
