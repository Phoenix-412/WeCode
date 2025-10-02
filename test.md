"title": "Add two numbers",
"description": "Write a program that takes two integers as input and returns the sum.",
"difficulty": "easy",
"tags": "array, math",
"visibleTestCases": [
    {
        "input": "3 5",
        "output": "8",
        "explanation": "3 + 5 equals 8"
    },
    {
        "input": "-2 7",
        "output": "5",
        "explanation": "-2 + 7 equals 5"
    }
],
"hiddenTestCases": [
    {
        "input": "0 0",
        "output": "0"
    },
    {
        "input": "-10 -5",
        "output": "-15"
    }
],
"starterCode": [
    {
        "language": "python",
        "initialCode": "def add_two_numbers(a, b):\n    # Write your code here\n    pass\n\nif __name__ == \"__main__\":\n    a, b = map(int, input().split())\n    print(add_two_numbers(a, b))"
    },
    {
        "language": "javascript",
        "initialCode": "function addTwoNumbers(a, b) {\n    // Write your code here\n}\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim().split(' ');\nconst a = parseInt(input[0], 10);\nconst b = parseInt(input[1], 10);\nconsole.log(addTwoNumbers(a, b));"
    },
    {
        "language": "java",
        "initialCode": "import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumbers(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        System.out.println(addTwoNumbers(a, b));\n    }\n}"
    },
    {
        "language": "c++",
        "initialCode": "#include <iostream>\nusing namespace std;\n\nint addTwoNumbers(int a, int b) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << addTwoNumbers(a, b) << endl;\n    return 0;\n}"
    }
],
"referenceSolution": [
    {
        "language": "python",
        "code": "def add_two_numbers(a, b):\n    return a + b\n\nif __name__ == \"__main__\":\n    a, b = map(int, input().split())\n    print(add_two_numbers(a, b))"
    },
    {
        "language": "javascript",
        "code": "function addTwoNumbers(a, b) {\n    return a + b;\n}\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim().split(' ');\nconst a = parseInt(input[0], 10);\nconst b = parseInt(input[1], 10);\nconsole.log(addTwoNumbers(a, b));"
    },
    {
        "language": "java",
        "code": "import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumbers(int a, int b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        System.out.println(addTwoNumbers(a, b));\n    }\n}"
    },
    {
        "language": "c++",
        "code": "#include <iostream>\nusing namespace std;\n\nint addTwoNumbers(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << addTwoNumbers(a, b) << endl;\n    return 0;\n}"
    }
]