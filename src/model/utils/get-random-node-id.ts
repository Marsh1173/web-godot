/**
 * @returns a random number between 0 and MAX_SAFE_INTEGER
 */
export function get_random_node_id(): number {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
