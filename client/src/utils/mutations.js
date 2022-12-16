import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        _id
      }
    }
  }
`;

// export const ADD_COURSE = gql`
//   mutation addCourse($courseName: String!, $startDate: String!, $endDate: String!, $description: String!) {
//   addCourse(courseName: $courseName, startDate: $startDate, endDate: $endDate, description: $description) {
//     _id
//     courseName
//     startDate
//     endDate
//     description
//     instructor
//   }
// }
// `;

// export const ADD_STUDENT = gql`
//   mutation addStudent($firstName: String!, $lastName: String!, $course: String!) {
//   addStudent(firstName: $firstName, lastName: $lastName, course: $course) {
//     _id
//     firstName
//     lastName
//     course
//   }
// }
// `;

// export const ADD_ASSIGNMENT = gql`
//   mutation addAssignment($assignmentName: String!, $grade: Float, $studentId: String) {
//   addAssignment(assignmentName: $assignmentName, grade: $grade, studentId: $studentId) {
//     assignmentName
//     grade
//   }
// }
// `;

// export const UPDATE_ASSIGNMENT = gql`
//   mutation updateAssignment($assignmentId: String!, $newGrade: Float) {
//   updateAssignment(assignmentId: $assignmentId, newGrade: $newGrade) {
//     assignmentName
//     grade
//   }
// }
// `;

// export const DELETE_ASSIGNMENT = gql`
//   mutation deleteAssignment($assignmentId: String!, $studentId: String) {
//   deleteAssignment(assignmentId: $assignmentId, studentId: $studentId) {
//     course
//   }
// }
// `;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_COLLECTION = gql`
  mutation AddCollection(
    $name: String
    $symbol: String
    $address: String
    $supply: Float
    $sales: Float
    $logo: String
    $volume: Float
    $floor: Float
    $avg_price: Float
  ) {
    addCollection(
      name: $name
      symbol: $symbol
      address: $address
      supply: $supply
      sales: $sales
      logo: $logo
      volume: $volume
      floor: $floor
      avg_price: $avg_price
    ) {
      _id
      address
      avg_price
      logo
      floor
      name
      sales
      supply
      symbol
      volume
      website
    }
  }
`;

// remove collection from user favorites
export const REMOVE_COLLECTION = gql`
  mutation RemoveCollection($collectionId: ID!) {
    removeCollection(collectionId: $collectionId) {
      _id
      name
      address
    }
  }
`;
